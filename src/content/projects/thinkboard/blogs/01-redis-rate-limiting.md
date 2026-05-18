---
title: "Protecting Your Node.js API with Upstash Redis Rate Limiting"
date: "2025-07-01"
tags: ["Redis", "Upstash", "Node.js", "Rate Limiting", "MERN", "Express"]
summary: "What rate limiting is, why every public API needs it, and a practical implementation using Upstash Redis in a MERN stack notes app."
---

## Why Rate Limiting Matters

Without rate limiting, any public API endpoint is vulnerable to:

- **Abuse** — a script can hammer your `/api/notes` endpoint thousands of times per second
- **Cost overruns** — if you use pay-per-use cloud services, unbounded requests mean unbounded bills
- **Accidental overload** — a poorly written client can flood your server without malicious intent

For Thinkboard, rate limiting protects the CRUD endpoints from abuse and keeps the app responsive for real users.

## Why Upstash?

Traditional rate limiting stores a counter per IP in an in-memory store like Redis. This works but requires a running Redis instance. **Upstash** is serverless Redis — managed, with a generous free tier, accessible via a REST API from anywhere.

The `@upstash/ratelimit` SDK makes the implementation nearly trivial.

## Setting It Up

### Step 1 — Environment variables

Create a free database at [upstash.com](https://upstash.com) and add these to your `.env`:

```
UPSTASH_REDIS_REST_URL=https://your-db.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_token_here
```

### Step 2 — The rate limiter middleware

```js
// middleware/rateLimiter.js
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  }),
  limiter: Ratelimit.slidingWindow(10, '10 s'), // 10 requests per 10-second window
});

export async function rateLimiterMiddleware(req, res, next) {
  const identifier = req.ip;
  const { success, limit, remaining, reset } = await ratelimit.limit(identifier);

  res.setHeader('X-RateLimit-Limit', limit);
  res.setHeader('X-RateLimit-Remaining', remaining);
  res.setHeader('X-RateLimit-Reset', reset);

  if (!success) {
    return res.status(429).json({ error: 'Too many requests. Please slow down.' });
  }

  next();
}
```

### Step 3 — Apply to routes

```js
// routes/notes.js
import express from 'express';
import { rateLimiterMiddleware } from '../middleware/rateLimiter.js';
import { getNotes, createNote, updateNote, deleteNote } from '../controllers/notes.js';

const router = express.Router();

router.use(rateLimiterMiddleware); // applied to every note route

router.get('/', getNotes);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;
```

## Sliding Window vs. Fixed Window

I chose `slidingWindow` over `fixedWindow` deliberately. With a fixed window, a user can send 10 requests at 11:59:59 and another 10 at 12:00:01 — 20 requests in 2 seconds, even though the limit is 10 per 10 seconds.

A sliding window counts requests in a rolling time frame, so that burst is blocked. It uses slightly more Redis storage (it tracks individual timestamps rather than a single counter) but the protection is significantly stronger.

## Testing It

```bash
# Fire 15 requests rapidly and print each HTTP status code
for i in {1..15}; do
  curl -s -o /dev/null -w "%{http_code}\n" http://localhost:5001/api/notes
done
```

Output:
```
200 200 200 200 200 200 200 200 200 200 429 429 429 429 429
```

First 10 succeed, the next 5 are rate-limited. Exactly as configured.

## One Gotcha: IP Detection Behind a Proxy

If your app sits behind a reverse proxy (Nginx, Vercel, Railway, etc.), `req.ip` will be the proxy's IP, not the client's. Enable Express's trust proxy setting so it reads from `X-Forwarded-For`:

```js
app.set('trust proxy', 1);
```

Without this, every user appears to come from the same IP and the rate limit applies globally instead of per-user.
