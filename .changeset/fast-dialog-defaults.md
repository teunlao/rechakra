---
"@rechakra/react": patch
---

Disable modal side-effects by default in `DialogRoot` (no focus trap, scroll
lock, or aria-hidden) to reduce UI lag; apps can opt back in via props.
