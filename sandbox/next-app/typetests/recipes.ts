import type { RecipeProps, SlotRecipeProps } from "@rechakra/react"

type BrandChipProps = RecipeProps<"brandChip">
const brandOk: BrandChipProps = { tone: "primary" }
const brandOk2: BrandChipProps = { tone: "secondary", size: "sm" }
void [brandOk, brandOk2]
// @ts-expect-error tone only accepts defined values
const brandBad: BrandChipProps = { tone: "ghost" }

const heroOk: SlotRecipeProps<"heroCard"> = { tone: "primary" }
void heroOk
// @ts-expect-error no random tone value
const heroBad: SlotRecipeProps<"heroCard"> = { tone: "danger" }

type InputRecipeProps = RecipeProps<"input">
const inputOk: InputRecipeProps = { variant: "brand", size: "lg" }
void inputOk
// @ts-expect-error "ghost" is not part of overridden variant union
const inputBad: InputRecipeProps = { variant: "ghost" }
