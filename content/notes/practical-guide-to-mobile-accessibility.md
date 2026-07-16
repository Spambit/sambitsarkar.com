---
title: "A Practical Guide To Mobile Accessibility"
date: "2026-07-16"
stage: "published"
order: 1
summary: "The 80/20 approach to mobile accessibility — what to test, what to automate, what to skip. Covers greenfield, legacy, native, and hybrid."
tags: ["mobile", "accessibility", "guide"]
---

## The 80/20 Rule

You don't need a huge accessibility program. Focus on 5 things and you'll cover 80-90% of the value for 20% of the cost.

### 1. Test with real screen readers

The single highest-value activity. Automated scanning does not validate the actual VoiceOver/TalkBack experience.

- iOS → VoiceOver
- Android → TalkBack

Verify: every button has a meaningful label, screen reading order makes sense, user can complete critical workflows (login, search, submit).

### 2. Run automated scanners

- Accessibility Scanner (Android)
- iOS Accessibility Inspector
- axe-core (for WebView content)

These catch missing labels, low contrast, small touch targets. Necessary but not sufficient — they find obvious problems but miss experiential ones.

### 3. Check color contrast

Minimum: WCAG AA, 4.5:1 text contrast ratio. Avoid light gray text on white, and status indicated by color alone.

### 4. Verify touch target sizes

- 44x44 points (iOS)
- 48x48 dp (Android)

Common failures: tiny close buttons, small checkboxes, dense menus.

### 5. Keyboard and focus testing

Critical in hybrid apps. Verify: focus moves logically, modals trap focus, focus returns after dialogs close, no hidden elements receive focus.

---

## What Must Be Spoken

- **Actions, not visuals.** "Delete message" not "red X icon."
- **State changes.** "Notifications: on" — not just a click sound.
- **Success and failure.** "Message sent." / "Error: email invalid." A sighted user sees a banner. A blind user hears nothing unless you announce it.
- **Loading states.** Silence is confusion for screen reader users.
- **Toasts and alerts.** A toast that appears for 3 seconds and disappears is invisible unless marked as a live region.

## Focus and Navigation Order

- Match visual reading order (top-to-bottom, left-to-right)
- Move focus to new content (modals, errors, new sections)
- Return focus to trigger when content disappears
- Skip decorative elements — dividers, background images, icons
- Group related elements — a card should be one swipe stop, not three

## External Mobile Keyboard Tab Order

For iPad Smart Keyboard, Android Bluetooth keyboards:

- Tab between interactive elements only
- Enter/Space to activate
- Escape to dismiss modals
- Arrow keys within components (tabs, lists)
- Visible focus indicator always

---

## Design Decisions That Prevent Future Pain

**Avoid gesture-only interactions.** A blind user can't swipe-to-delete. Provide context menus, edit modes, or accessible custom actions as alternatives.

**Respect `prefers-reduced-motion`.** Animated screens confuse screen readers — content moves while VoiceOver reads. Check `UIAccessibility.isReduceMotionEnabled` (iOS) or `ANIMATOR_DURATION_SCALE` (Android).

**Design modals with focus trapping.** Without it, a blind user accidentally "escapes" the modal by swiping and reads content behind it — never knowing the modal is still open.

**Use composite views, not canvas drawing.** Build custom components from standard accessible primitives (stack views, buttons, labels). The accessibility tree already understands them.

---

## Making It Stick: Definition of Done + CI/CD

### In your Jira Definition of Done:

- All interactive elements have accessibility labels
- Screen reader navigation order is logical
- Color contrast meets AA (4.5:1)
- Touch targets meet minimum size
- Tested with VoiceOver or TalkBack

### In CI/CD (GitHub Actions, Azure DevOps):

```
PR → Build → UI Tests (accessibility checks enabled) → Scan report → Deploy
```

- Hybrid: axe-core step fails PR on critical violations
- iOS: Accessibility Audit in XCUITest
- Android: `AccessibilityChecks.enable()` in Espresso — one line, catches common issues during existing tests

CI catches regressions. Humans verify the experience.

---

## The Legacy Playbook

**Phase 1 (2-4 weeks):** Critical paths only — login, primary workflow, settings. Screen reader navigable.

**Phase 2 (2-4 weeks):** Automated scans. Bulk fix missing labels, contrast, touch targets. Mechanical changes, no architecture work.

**Phase 3 (ongoing):** Structural fixes attached to planned feature work. Never a standalone "accessibility sprint."

---

## Accessibility and Internationalization

They're the same problem:
- Flexible layouts (text grows 40% in German)
- RTL support (Arabic flips navigation order — so does screen reader focus)
- Externalized strings (accessibility labels must be localized too)
- Locale-aware formatting (screen readers announce dates/currencies)

Build for one, get the other mostly free.

---

## Key Takeaways

1. Accessibility is an architecture concern, not a decoration you add at the end.
2. Native gets 80% for free. Hybrid requires explicit effort.
3. 5 minutes of VoiceOver testing per screen catches more than any automated tool.
4. Target WCAG 2.1 AA. It's the standard that matters commercially.
5. For legacy, fix critical paths first. Ship incrementally.
6. Don't override OS accessibility features. You won't reimplement them as well.
7. Enterprise customers require VPATs now. The teams that built it in close deals.
8. An app with 10 accessible screens today beats 200 accessible screens "someday."
