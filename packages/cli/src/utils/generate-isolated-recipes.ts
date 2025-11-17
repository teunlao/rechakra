import type { SystemContext } from "@rechakra/react"
import { defaultSystem } from "@rechakra/react"
import { pretty } from "./pretty.js"
import { capitalize, isBooleanValue, unionType } from "./shared.js"

const defaultRecipes = defaultSystem._config.theme?.recipes ?? {}
const defaultSlotRecipes = defaultSystem._config.theme?.slotRecipes ?? {}

const defaultRecipeKeys = new Set(Object.keys(defaultRecipes))
const defaultSlotRecipeKeys = new Set(Object.keys(defaultSlotRecipes))

export async function generateIsolatedRecipes(
  sys: SystemContext,
  strict = true,
) {
  const theme = sys._config.theme ?? {}
  const customRecipes = Object.keys(theme.recipes ?? {}).filter((key) => {
    if (!defaultRecipeKeys.has(key)) return true
    const recipe = theme.recipes?.[key]
    const defaultRecipe = defaultRecipes[key]
    return recipe !== defaultRecipe
  })
  const customSlotRecipes = Object.keys(theme.slotRecipes ?? {}).filter(
    (key) => {
      if (!defaultSlotRecipeKeys.has(key)) return true
      const recipe = theme.slotRecipes?.[key]
      const defaultRecipe = defaultSlotRecipes[key]
      return recipe !== defaultRecipe
    },
  )

  if (process.env.DEBUG_RECIPE_KEYS) {
    console.log("custom recipes", customRecipes)
    console.log("custom slot recipes", customSlotRecipes)
  }

  const chunks: string[] = [
    'import type { ConditionalValue, RecipeDefinition, SlotRecipeDefinition, SystemRecipeFn, SystemSlotRecipeFn } from "@rechakra/react"',
    'import "@rechakra/react/typegen"',
  ]

  const recipeInterfaceChunks: string[] = []
  const recipeConfigEntries: string[] = []

  for (const key of customRecipes) {
    const recipe = theme.recipes?.[key]
    if (!recipe) continue
    const variantKeyMap = sys.cva(recipe).variantMap
    const upperName = capitalize(key)

    const variantLines = Object.keys(variantKeyMap)
      .map((variantKey) => {
        const def = Reflect.get(recipe.defaultVariants ?? {}, variantKey)
        const jsDoc = def ? `/** @default ${JSON.stringify(def)} */\n` : ""
        const values = variantKeyMap[variantKey]
        if (values.every(isBooleanValue)) {
          return `${jsDoc}${variantKey}?: boolean | undefined`
        }
        return `${jsDoc}${variantKey}?: ${unionType(values, !strict)} | undefined`
      })
      .join("\n")

    const variantInterface = `export interface ${upperName}Variant {\n${variantLines}\n}`
    const propsType = `export type ${upperName}VariantProps = {\n  [K in keyof ${upperName}Variant]?: ConditionalValue<${upperName}Variant[K]> | undefined\n}`
    const mapType = `export type ${upperName}VariantMap = {\n  [K in keyof ${upperName}Variant]: Array<${upperName}Variant[K]>\n}`

    recipeInterfaceChunks.push(variantInterface, propsType, mapType)
    recipeConfigEntries.push(
      `${key}: SystemRecipeFn<${upperName}VariantProps, ${upperName}VariantMap>`,
    )
  }

  const slotInterfaceChunks: string[] = []
  const slotConfigEntries: string[] = []
  const slotRecordEntries: string[] = []

  for (const key of customSlotRecipes) {
    const recipe = theme.slotRecipes?.[key]
    if (!recipe) continue
    const variantKeyMap = sys.sva(recipe).variantMap
    const upperName = capitalize(key)

    const slotUnion = unionType(recipe.slots ?? [])
    const slotType = `export type ${upperName}Slot = ${slotUnion}`

    const variantLines = Object.keys(variantKeyMap)
      .map((variantKey) => {
        const def = Reflect.get(recipe.defaultVariants ?? {}, variantKey)
        const jsDoc = def ? `/** @default ${JSON.stringify(def)} */\n` : ""
        const values = variantKeyMap[variantKey]
        if (values.every(isBooleanValue)) {
          return `${jsDoc}${variantKey}?: boolean | undefined`
        }
        return `${jsDoc}${variantKey}?: ${unionType(values, !strict)} | undefined`
      })
      .join("\n")

    const variantInterface = `export interface ${upperName}Variant {\n${variantLines}\n}`
    const propsType = `export type ${upperName}VariantProps = {\n  [K in keyof ${upperName}Variant]?: ConditionalValue<${upperName}Variant[K]> | undefined\n}`
    const mapType = `export type ${upperName}VariantMap = {\n  [K in keyof ${upperName}Variant]: Array<${upperName}Variant[K]>\n}`

    slotInterfaceChunks.push(slotType, variantInterface, propsType, mapType)
    slotConfigEntries.push(
      `${key}: SystemSlotRecipeFn<${upperName}Slot, ${upperName}VariantProps, ${upperName}VariantMap>`,
    )
    slotRecordEntries.push(`${key}: ${upperName}Slot`)
  }

  chunks.push(recipeInterfaceChunks.join("\n\n"))
  chunks.push(slotInterfaceChunks.join("\n\n"))

  const moduleAugmentation = `declare module "@rechakra/react/typegen" {\n  interface ChakraCustomRecipeConfig {\n    ${recipeConfigEntries.join("\n    ") || "// no custom recipes"}\n  }\n\n  interface ChakraCustomSlotRecipeConfig {\n    ${slotConfigEntries.join("\n    ") || "// no custom slot recipes"}\n  }\n\n  interface ChakraCustomRecipeSlots {\n    ${slotRecordEntries.join("\n    ") || "// no custom slots"}\n  }\n}`

  chunks.push(moduleAugmentation)

  return pretty(chunks.filter(Boolean).join("\n\n"))
}
