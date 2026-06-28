---
mode: agent
description: Run the full 11-point SDS compliance checklist against any TSX + CSS file pair. Automatically fixes violations and re-validates up to 3 times.
---

# Skill: sds-checklist

Run the full SDS compliance checklist against the generated files. Automatically fix violations and re-validate until PASS or retry limit reached.

## Instructions

1. Read both generated files in full from disk
2. Run through **every item** in the checklist below — do not skip any section
3. Produce a VALIDATION REPORT
4. If ❌ FAIL → automatically fix ALL violations (read `.github/agents/sds-developer.md` in full before fixing), then re-run this full checklist from scratch
5. Repeat up to **3 times** — if still ❌ FAIL after 3 retries, stop and report remaining violations for human review
6. If a violation reappears after being fixed → escalate immediately, do not waste a retry

> ⚠️ The fix-and-recheck loop runs **automatically without asking for confirmation**. Only pause if the 3-retry limit is reached.

---

## VALIDATION CHECKLIST

### 1. Imports
- [ ] All imports use aliases: `primitives`, `layout`, `compositions`, `data`, `hooks`, `icons`, `images`
- [ ] No imports from `@react-aria`, `@react-stately`, or any external UI lib
- [ ] No imports of non-existent SDS components
- [ ] No unused imports

### 2. Colors
- [ ] Zero hardcoded hex values (`#xxxxxx`)
- [ ] Zero hardcoded `rgb`/`rgba`/`hsl` values
- [ ] All colors use `var(--sds-color-*)`
- [ ] Any brand hex with no SDS token must have an inline CSS comment documenting why

### 3. Spacing
- [ ] Zero hardcoded `px` values in CSS
- [ ] Zero hardcoded `rem`/`em` values in CSS
- [ ] Zero inline style spacing (`style={{ padding: '16px' }}`)
- [ ] All spacing uses `var(--sds-size-space-*)` in CSS or numeric prop (`gap="400"`) on layout components

### 4. Typography
- [ ] Zero hardcoded `font-size`, `font-weight`, `line-height` values
- [ ] All type styles use `var(--sds-typography-*)` or `var(--sds-font-*)`
- [ ] All text rendered via SDS Text primitives (`TextHeading`, `TextSmall`, `TextSubtitle`, etc.) — no raw `<p>`, `<h1>`–`<h6>`, `<span>` for text content

### 5. Layout
- [ ] Zero custom `display:flex` in CSS — any class that only creates a row/column layout with gap/alignment **must** be replaced with `<Flex>` in JSX
- [ ] Zero custom `display:grid` in CSS
- [ ] All layout uses `<Flex>`, `<Section>`, or `<Grid>` components
- [ ] `<FlexItem>` must be a direct child of `<Flex>` — never inside a raw `<div>`
- [ ] Zero `style={{}}` props for layout (padding, margin, gap, alignment)
- [ ] Section/card areas use `<Section>` and `<Card variant="stroke" padding="600">` — not custom `<div>` wrappers with manual border/padding CSS

### 6. Component Props
- [ ] Every prop used exists in the component's TypeScript definition
- [ ] No invented props
- [ ] Correct prop names (`isSelected` not `selected`, `variant` not `type`, `onPress` not `onClick`)

### 7. Responsive
- [ ] `useMediaQuery` used for any responsive behavior
- [ ] `isMobile` used to conditionally adjust props (`padding`, `direction`, `gap`)

### 8. Annotations
- [ ] Every `data-content-annotation` implemented (dynamic text, images)
- [ ] Every `data-interaction-annotation` implemented (disabled states, handlers, conditions)

### 9. Hidden Nodes
- [ ] All `hidden={true}` Figma nodes handled as conditional props/state — not omitted silently

### 10. File Structure
- [ ] CSS imported in the TSX file
- [ ] No orphaned CSS classes (every class in CSS must be used in TSX)

### 11. Degenerate Elements
- [ ] No component with empty or comment-only children
- [ ] No raw `<a>` tags — use `<TextLink href="...">` from primitives
- [ ] No `<Section className="...">` that overrides `variant` background via CSS

---

## VALIDATION REPORT FORMAT

```
Validation Pass: <1 / 2 / 3>
Status: ✅ PASS / ❌ FAIL

Violations:
| # | File | Line | Issue | Rule | Fix |
|---|------|------|-------|------|-----|
| 1 | Screen.tsx | L24 | import from @react-aria | No external UI libs | Change to primitives import |
| 2 | Screen.css | L12 | color: #111111 | No hardcoded colors | Use var(--sds-color-text-default-default) |

Passed Checks:
- ✅ All imports use aliases
- ✅ No hardcoded colors
- ...

Action:
- ❌ FAIL → fixing violations now (Pass <n+1> incoming)
- ✅ PASS → final code approved
```
