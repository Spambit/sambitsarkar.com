---
title: "AI Features: Build vs Buy"
number: "005"
date: "2026-07-08"
status: "Accepted"
category: "AI"
stage: "draft"
summary: "Framework for deciding when to build AI/ML capabilities in-house versus integrating third-party AI services."
tags: ["ai", "architecture", "build-vs-buy"]
---

## Context

Every enterprise product team is being asked to "add AI." The build-vs-buy decision for AI features is fundamentally different from traditional software because:

- The technology is evolving faster than any previous wave
- Model capabilities improve quarterly without engineering effort
- Build costs include data infrastructure, not just code
- Third-party APIs offer capabilities that would take years to build internally

## Decision

Use the following framework:

### Buy (Use Third-Party APIs) When:

- The AI feature is a commodity capability (summarization, classification, extraction)
- Time-to-market matters more than differentiation
- The team lacks ML engineering expertise
- Data sensitivity allows external processing
- The feature is experimental/exploratory

### Build When:

- The AI is the core product differentiator
- Data cannot leave the organization (regulatory, competitive)
- Custom model behavior is required that prompting cannot achieve
- Scale economics favor self-hosted models (high-volume inference)
- Long-term competitive advantage depends on proprietary models

### Hybrid (Most Common):

- Use third-party models via API with proprietary prompts and RAG
- Fine-tune open-source models on domain data
- Build orchestration and evaluation layers in-house
- Keep the option to swap providers

## Consequences

### Buy

- Fast time to value (days/weeks)
- Ongoing per-call costs that scale with usage
- Vendor dependency for capability improvements
- Limited control over model behavior

### Build

- Higher upfront investment (months)
- Requires specialized talent (ML engineers, data engineers)
- Full control over behavior and costs at scale
- Risk of falling behind frontier model capabilities

## Notes

The most common mistake is building infrastructure to host models when the real value is in the application layer (prompts, evaluation, user experience).

For most enterprise features in 2026, the optimal strategy is: third-party model + proprietary context (RAG) + custom evaluation pipeline. This captures 80% of the value at 20% of the build cost.
