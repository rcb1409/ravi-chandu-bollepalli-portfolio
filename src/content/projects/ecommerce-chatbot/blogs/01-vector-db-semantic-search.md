---
title: "Semantic Search with Vector Databases: FAQ Retrieval That Actually Works"
date: "2025-07-15"
tags: ["Vector DB", "Embeddings", "Groq", "Python", "Semantic Search", "ChromaDB"]
summary: "Why keyword search fails for e-commerce FAQs, how vector embeddings fix the problem, and the full implementation behind the FAQ retrieval system in my chatbot."
---

## The Problem with Keyword Search

The original version of the chatbot used simple `LIKE '%query%'` SQL matching against a table of FAQ entries. It worked for exact matches but broke immediately for anything semantic.

For example:
- User asks: *"what happens if I return something?"*
- FAQ entry: *"What is your refund policy?"*

Zero keyword overlap. The SQL query returns nothing. The user gets no answer despite the FAQ clearly existing.

This is the classic recall problem with keyword search: it finds documents that *share words* with the query, not documents that *mean the same thing*.

## How Embeddings Fix This

A vector embedding converts text into a dense numerical vector where semantically similar text ends up close together in vector space. Both *"what happens if I return something?"* and *"What is your refund policy?"* map to vectors that are near each other — even though they share no words.

The retrieval process:
1. **Setup time**: embed every FAQ entry and store the vectors in a vector database.
2. **Query time**: embed the user's question, find the `k` most similar FAQ vectors (nearest neighbors), return the corresponding FAQ text.

## Implementation

I used **ChromaDB** as the vector store (runs fully in-process, no separate server to manage) and `sentence-transformers` for generating embeddings.

```python
import chromadb
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')
client = chromadb.Client()
collection = client.create_collection("faqs")

def index_faqs(faqs: list[dict]):
    """Call once at startup to embed and store all FAQ entries."""
    embeddings = model.encode([f["question"] for f in faqs]).tolist()
    collection.add(
        documents=[f["answer"] for f in faqs],
        embeddings=embeddings,
        ids=[str(i) for i in range(len(faqs))]
    )

def retrieve_faq(query: str, top_k: int = 1) -> str | None:
    """Returns the best-matching FAQ answer, or None if similarity is too low."""
    query_embedding = model.encode([query]).tolist()
    results = collection.query(query_embeddings=query_embedding, n_results=top_k)
    if results["distances"][0][0] < 0.5:  # similarity threshold
        return results["documents"][0][0]
    return None
```

The `0.5` distance threshold is the critical piece — it prevents the chatbot from returning a vaguely-related FAQ when the question is actually a product query (which routes to the SQL pipeline instead).

## Routing: FAQ vs. Product Queries

The chatbot handles two fundamentally different question types:
- **FAQ questions**: "What's your return policy?" → semantic search in ChromaDB
- **Product questions**: "Show me laptops under $800" → SQL query against the scraped product database

A lightweight Groq classifier routes between them:

```python
from groq import Groq

groq_client = Groq()

def classify_query(query: str) -> str:
    response = groq_client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[{
            "role": "user",
            "content": (
                "Classify this e-commerce query as 'faq' or 'product'. "
                "Reply with one word only.\n"
                f"Query: {query}"
            )
        }]
    )
    return response.choices[0].message.content.strip().lower()
```

Using `llama3-8b` here keeps costs low — this is a simple binary classification, not generation, so the smallest capable model is fine.

## What I'd Improve

The `all-MiniLM-L6-v2` embedding model is fast and small but is a general-purpose model, not fine-tuned for e-commerce. A model fine-tuned on retail-domain text would meaningfully improve retrieval accuracy on edge cases like ambiguous product-related questions.

Adding a **cross-encoder re-ranker** as a second pass would also reduce false positives — the bi-encoder (used above) is fast but approximate; a cross-encoder scores pairs directly and is more accurate, just slower.
