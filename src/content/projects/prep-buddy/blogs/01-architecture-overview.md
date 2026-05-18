---
title: "Building an AI-Powered Mock Interview Platform"
date: "2025-08-01"
tags: ["Next.js", "Firebase", "Vapi AI", "Architecture", "Google Gemini"]
summary: "A deep dive into the system design and key technical decisions behind Prep Buddy — an AI-powered interview simulator with real-time voice agents."
---

## What is Prep Buddy?

Prep Buddy is an AI-powered web application that simulates real-time technical and behavioral interviews. Users pick a role, start a session, and speak to a voice AI agent that asks contextual follow-up questions — then generates detailed, rubric-based feedback when the session ends.

## The Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Frontend | Next.js 14 (App Router) | Server Components reduce client JS; built-in routing |
| Auth & DB | Firebase Auth + Firestore | Managed auth + real-time capable NoSQL — no backend server needed |
| Voice AI | Vapi AI | Low-latency full-duplex voice pipeline with custom LLM integration |
| Feedback | Google Gemini Pro | Strong structured output for rubric-based evaluation |
| Hosting | Vercel | Zero-config Next.js deployment |

## Architecture Overview

The core session flow looks like this:

```
User → Next.js App → Vapi AI (live voice session)
                          ↓
                    Gemini Pro (feedback generation)
                          ↓
                    Firestore (store session + feedback)
                          ↓
                    Dashboard (Next.js Server Component)
```

## Key Design Decisions

### 1. Why Vapi AI for Voice?

I evaluated three options: the browser's Web Speech API, a DIY Deepgram + TTS setup, and Vapi AI. Vapi won because it handles the entire full-duplex voice pipeline — speech-to-text, context window management, turn-taking, and text-to-speech — in a single SDK call.

Building this with Deepgram would have required managing WebSocket connections, audio buffering, and conversation state manually. Vapi abstracts all of that away so I could focus on the interview logic itself.

### 2. Firebase Instead of a Traditional Backend

For this project, spinning up an Express + PostgreSQL backend just for auth and document storage was overkill. Firebase Admin SDK handles role-based access control (RBAC) via custom claims, and Firestore handles session storage with real-time listeners built in.

The tradeoff: Firestore's query model is limited — no JOINs, no complex aggregations. But the interview dashboard only needs simple reads filtered by user ID, so this constraint never actually bit me.

### 3. Server Components for the Dashboard

The performance dashboard reads historical interview data from Firestore. Since this data doesn't change mid-page, there's no reason to fetch it client-side. Moving this to a Next.js Server Component eliminated a cascade of client-side fetches and reduced the JS bundle for that route by ~35%.

## What I'd Do Differently

**Session state in Redis, not Firestore.** During a live interview, the current conversation context is read and written on every turn. Firestore round-trips add ~100–200ms of latency per turn. A Redis-backed session store would be meaningfully faster.

**Stream the feedback.** Right now, Gemini generates the full feedback report and it appears all at once after the session. Streaming the response token-by-token would feel far more responsive — the user would see feedback start appearing within a second instead of waiting 5–8 seconds for the full report.
