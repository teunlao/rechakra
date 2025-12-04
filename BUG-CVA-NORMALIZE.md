# Bug: Recipe base styles not normalized, causing shorthand property conflicts

## Summary

In `cva.ts`, variant styles are normalized (shorthand properties like `rounded`
converted to `borderRadius`), but **base styles are NOT normalized**. This
causes shorthand properties in `base` to overwrite longhand properties from
variants during final CSS generation.

## Affected Version

Introduced in commit `f26e863ad` ("fix: cva normalize") - September 30, 2025

## Root Cause

In `packages/react/src/styled-system/cva.ts`:

```ts
// Line 38-41: Variants ARE normalized
const variants = mapEntries(defaultsConfig.variants, (key, obj) => [
  key,
  mapEntries(obj, (optionKey, styles) => [optionKey, normalize(styles)]),
])

// Line 57: Base is NOT normalized
let variantCss = { ...base } // ← BUG: base used as-is

mergeWith(variantCss, getVariantCss(variantSelections))
```

## The Problem

When a recipe has:

- `base: { rounded: '1rem' }` (shorthand)
- `size.md: { rounded: '100px' }` (shorthand)

After processing:

1. `size.md.rounded` is normalized → `borderRadius: '100px'`
2. `base.rounded` stays as `rounded: '1rem'` (not normalized)
3. After `mergeWith`: `{ borderRadius: '100px', rounded: '1rem', ... }`
4. During final `css()` call, `normalize()` converts `rounded: '1rem'` →
   `borderRadius: '1rem'`
5. **This OVERWRITES the `borderRadius: '100px'` from size.md!**

The order in `walkObject` matters - when iterating over the merged object,
`rounded` comes after `borderRadius` in insertion order, so the normalized
`rounded` overwrites the already-set `borderRadius`.

## Reproduction

```tsx
const buttonRecipe = defineRecipe({
  base: {
    rounded: "1rem", // shorthand in base
  },
  variants: {
    size: {
      md: {
        rounded: "100px", // should override base
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
})

// Expected: border-radius: 100px
// Actual: border-radius: 1rem (16px)
```

## Fix

Normalize base styles the same way as variant styles:

```diff
- let variantCss = { ...base }
+ let variantCss = { ...normalize(base) }
```

Or normalize base during recipe initialization:

```diff
const defaultsConfig = defaults(config)
- const { base, defaultVariants, compoundVariants } = defaultsConfig
+ const { defaultVariants, compoundVariants } = defaultsConfig
+ const base = normalize(defaultsConfig.base)
```

## Workaround

Avoid using shorthand properties (`rounded`) in recipe base when using the same
shorthand in variants. Either:

1. Remove shorthand from base entirely
2. Use longhand (`borderRadius`) consistently in both base and variants
