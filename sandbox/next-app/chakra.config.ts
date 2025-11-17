import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineRecipe,
  defineSlotRecipe,
} from "@rechakra/react"

const brandChipRecipe = defineRecipe({
  className: "brand-chip",
  base: {
    borderRadius: "full",
    fontWeight: "semibold",
    textTransform: "uppercase",
    letterSpacing: "widest",
  },
  variants: {
    tone: {
      primary: { bg: "brand.primary", color: "white" },
      secondary: { bg: "brand.secondary", color: "white" },
    },
    size: {
      sm: { px: 2, py: 1, fontSize: "xs" },
      md: { px: 3, py: 1.5, fontSize: "sm" },
    },
  },
  defaultVariants: {
    tone: "primary",
    size: "md",
  },
})

const heroCardRecipe = defineSlotRecipe({
  className: "hero-card",
  slots: ["root", "badge", "body"],
  base: {
    root: {
      rounded: "2xl",
      p: 6,
      display: "flex",
      flexDir: "column",
      gap: 4,
      shadow: "lg",
    },
    badge: {
      fontSize: "xs",
      textTransform: "uppercase",
      letterSpacing: "widest",
    },
    body: {
      fontSize: "lg",
    },
  },
  variants: {
    tone: {
      primary: {
        root: { bg: "brand.primary", color: "white" },
        badge: { color: "whiteAlpha.800" },
      },
      secondary: {
        root: { bg: "brand.secondary", color: "white" },
        badge: { color: "whiteAlpha.900" },
      },
    },
  },
  defaultVariants: {
    tone: "primary",
  },
})

const inputRecipe = defineRecipe({
  className: "custom-input",
  base: {
    borderWidth: "1px",
    rounded: "md",
    fontSize: "md",
    transitionProperty: "common",
    transitionDuration: "fast",
    _focusVisible: {
      ring: "2px",
      ringColor: "brand.primary",
      ringOffset: "1px",
    },
  },
  variants: {
    size: {
      sm: { px: 2, py: 1, fontSize: "sm" },
      md: { px: 3, py: 2 },
      lg: { px: 4, py: 3, fontSize: "lg" },
    },
    variant: {
      outline: {
        borderColor: "gray.300",
        bg: "white",
      },
      subtle: {
        bg: "gray.50",
      },
      brand: {
        borderColor: "brand.primary",
        bg: "white",
        color: "brand.primary",
        _placeholder: { color: "brand.primary" },
      },
    },
  },
  defaultVariants: {
    size: "md",
    variant: "brand",
  },
})

const config = defineConfig({
  strictTokens: true,
  theme: {
    tokens: {
      colors: {
        brand: {
          primary: { value: "#4C6FFF" },
          secondary: { value: "#FF6B6B" },
        },
      },
    },
    recipes: {
      brandChip: brandChipRecipe,
      input: inputRecipe,
    },
    slotRecipes: {
      heroCard: heroCardRecipe,
    },
  },
})

const system = createSystem(defaultConfig, config)

export default system
