---
title: "Native vs Web Technologies for Mobile"
number: "003"
date: "2026-07-14"
status: "Accepted"
category: "Mobile"
stage: "draft"
summary: "Evaluating when to choose native platform development over cross-platform or web technologies for mobile applications."
tags: ["mobile", "architecture", "native", "cross-platform"]
---

## Context

Every mobile project faces the fundamental question: native or cross-platform? The answer depends on more factors than most teams consider.

Having worked on mobile systems for over a decade, the decision is rarely about technology preferences — it's about trade-offs that compound over time.

## Decision

Choose **native** (Swift/Kotlin) when:

- The app requires deep OS integration (background processing, hardware access, system APIs)
- Performance is critical (real-time, animations, large data sets)
- The app IS the product (user experience is the differentiator)
- Long-term maintenance horizon (5+ years)
- Platform-specific UX expectations matter

Choose **cross-platform** (React Native, Flutter, KMP) when:

- Time-to-market is the primary constraint
- The app is primarily content/data display
- The team has stronger web skills than mobile skills
- Feature parity across platforms is more important than platform-native feel
- The app is an extension of a web product, not a standalone product

## Consequences

### Native

- Higher development cost (2 codebases)
- Better long-term maintainability per platform
- Access to latest platform features immediately
- Easier to hire specialists

### Cross-platform

- Faster initial delivery
- Shared business logic reduces bugs
- Platform updates may break the abstraction layer
- Debugging often requires platform-specific knowledge anyway

## Notes

The hidden cost of cross-platform is not the framework itself — it's the escape hatches. When you need native modules, bridging, or platform-specific behavior, the complexity often exceeds what native development would have cost from the start.

The decision should be revisited when team composition, product requirements, or platform capabilities change significantly.
