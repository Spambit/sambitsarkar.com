---
title: "Accessibility Strategy: Hybrid vs Native Mobile Apps"
number: "002"
date: "2026-07-16"
status: "Accepted"
category: "Mobile"
stage: "published"
order: 2
summary: "Native apps should lean on platform accessibility APIs. Hybrid apps must build accessibility explicitly. The approach also depends on whether you're starting fresh or retrofitting."
tags: ["mobile", "accessibility", "hybrid", "native"]
---

## Context

A customer contract now requires WCAG 2.1 AA compliance. The team asks: "How do we make our app accessible?" The answer depends entirely on two factors — the app's architecture (native vs hybrid) and whether it's greenfield or legacy.

Accessibility is not about sprinkling `aria-label` onto existing UI. It's about how the UI is built structurally — component choices, view hierarchy, navigation patterns. If the structure is wrong, no amount of attributes fixes it.

I've watched this play out across teams for over a decade. The pattern is always the same: accessibility gets deferred, a contract demands it, and the team scrambles. This decision establishes how to approach it before the scramble.

## Decision

### Native apps: Use what the platform gives you

Don't fight UIKit/SwiftUI or Jetpack Compose — they already provide accessible components. The decision is to **never override OS-level accessibility behavior** and to use composite views (stacking standard primitives) instead of custom-drawn canvases.

Specifically:
- Standard components only (accessible by default)
- Explicit `accessibilityLabel` on every non-text element — a close "X" won't announce "dismiss camera" on its own
- Respect Dynamic Type / font scaling — never hard-code sizes
- Never suppress VoiceOver focus or reduce-motion preferences

### Hybrid apps: Build the accessibility tree yourself

The "write once" promise breaks for accessibility. Screen readers interact with the platform layer, not your JavaScript. The decision is to **treat accessibility as a first-class manual effort** in hybrid, not a framework default.

Specifically:
- React Native: explicit `accessibilityLabel`, `accessibilityRole`, `accessibilityState` on every element
- Flutter: explicit `Semantics` widgets — the accessibility tree is entirely your responsibility
- WebViews: avoid for critical flows; focus management across native/web boundaries is unreliable
- Test on real devices — simulators lie about screen reader behavior

### Greenfield vs Legacy

**Greenfield:** Bake it in from sprint one. Add accessibility checks to Definition of Done. Enable `AccessibilityChecks` in Espresso / Accessibility Audit in XCUITest. Make CI fail on violations (axe-core for hybrid, native assertions for platform).

**Legacy:** Don't boil the ocean. Fix 3-5 critical paths first (login, primary workflow, settings). Run automated scans for bulk label/contrast fixes. Attach structural fixes to planned feature work — never as a standalone "accessibility sprint" that gets deprioritized.

## Consequences

**Positive:**
- Native apps get 80% accessibility for free when using standard components
- Establishing CI gates prevents regressions permanently
- Progressive approach for legacy avoids the "accessible someday" trap
- WCAG AA target gives teams a clear definition of done

**Negative:**
- Hybrid apps require significantly more manual effort — the abstraction doesn't help here
- Teams need at least one person who regularly tests with VoiceOver/TalkBack
- Legacy retrofitting is 3-5x more expensive than building it in — but still cheaper than losing contracts

## Trade-offs Accepted

- Targeting AA, not AAA — covers real user needs without over-engineering
- Accepting that hybrid accessibility will never be as seamless as native
- CI catches regressions but not experiential issues — manual screen reader testing stays in the process
- Legacy apps improve incrementally, not all at once

## Notes

Accessibility and internationalization are the same architectural problem. Flexible layouts, externalized strings, RTL support, locale-aware formatting — solve one well and the other is mostly free. I've seen TalkBack announce "Submit" in English while the button displays Chinese, because the developer hard-coded accessibility labels instead of routing through localization.

The commercial reality: enterprise customers now include VPAT requirements in procurement. The teams that built accessibility in from the start close deals. The teams that didn't are scrambling to retrofit in 90 days.

If accessibility is a hard requirement and you're choosing architecture — native gives you a significant head start.
