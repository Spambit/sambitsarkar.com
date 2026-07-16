---
title: "Designing Offline Sync"
number: "003"
date: "2026-07-12"
status: "Accepted"
category: "Mobile"
summary: "Offline-first architectures require careful conflict resolution strategies. This documents the trade-offs between approaches."
tags: ["mobile", "sync", "offline", "architecture"]
---

## Context

Mobile applications frequently need to work in environments with unreliable or no network connectivity. Offline-first design is not just a feature — it's an architectural commitment that affects every layer of the system.

## Decision

Adopt an **event-sourced offline sync** pattern with the following characteristics:

- Local-first data storage with optimistic UI
- Conflict resolution using last-write-wins (LWW) for simple fields
- Operational transforms for collaborative text/structured data
- Server as the source of truth with client-side merge capabilities
- Background sync with exponential backoff

### Rejected Alternatives

- **Full sync on reconnect**: Too expensive for large datasets
- **Server-first with cache**: Poor offline UX, high latency perception
- **CRDTs everywhere**: Over-engineered for most business data

## Consequences

### Positive

- Users can work without network connectivity
- Perceived performance is excellent (no loading states for local data)
- System is resilient to network failures
- Reduces server load (batched syncs vs. real-time)

### Negative

- Conflict resolution adds significant complexity
- Local storage limits must be managed
- Testing matrix expands (online, offline, transitioning, conflicting states)
- Data freshness guarantees are weaker

## Notes

The most common mistake is underestimating the conflict surface. Every field that can be edited offline by multiple users needs an explicit conflict resolution strategy.

Start with LWW for everything, then add more sophisticated resolution only where users report actual data loss. Premature conflict resolution optimization is a significant source of accidental complexity.
