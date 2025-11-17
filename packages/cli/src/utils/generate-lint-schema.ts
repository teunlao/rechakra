import type { SystemContext } from "@rechakra/react"

export interface DesignSystemSchemaPropInfo {
  kinds: string[]
  types: string[]
}

export interface DesignSystemSchemaRecipeVariantInfo {
  values: Array<string | boolean>
  default?: string | boolean
}

export interface DesignSystemSchemaRecipeInfo {
  variants: Record<string, DesignSystemSchemaRecipeVariantInfo>
}

export interface DesignSystemSchemaSlotRecipeInfo
  extends DesignSystemSchemaRecipeInfo {
  slots: string[]
}

export interface DesignSystemSchemaJson {
  version: 1
  mode: "default" | "isolated"
  tokens: Record<string, string[]>
  props: Record<string, DesignSystemSchemaPropInfo>
  recipes?: Record<string, DesignSystemSchemaRecipeInfo>
  slotRecipes?: Record<string, DesignSystemSchemaSlotRecipeInfo>
}

const TOKEN_KIND_REGEX = /Tokens\["([^"]+)"\]/g

export function generateDesignSystemSchema(
  sys: SystemContext,
  mode: "default" | "isolated" = "default",
): DesignSystemSchemaJson {
  const tokensByKind: Record<string, string[]> = {}

  const { categoryMap } = sys.tokens

  for (const [kind, values] of categoryMap.entries()) {
    tokensByKind[kind] = Array.from(values.keys()).sort()
  }

  const props: Record<string, DesignSystemSchemaPropInfo> = {}
  const types = sys.utility.getTypes()

  for (const [prop, valueTypes] of types.entries()) {
    const kinds = new Set<string>()

    for (const type of valueTypes) {
      let match: RegExpExecArray | null
      // eslint-disable-next-line no-cond-assign
      while ((match = TOKEN_KIND_REGEX.exec(type)) !== null) {
        kinds.add(match[1])
      }
    }

    props[prop] = {
      kinds: Array.from(kinds).sort(),
      types: [...valueTypes],
    }
  }

  const theme = sys._config.theme ?? {}

  const recipes: Record<string, DesignSystemSchemaRecipeInfo> = {}
  const slotRecipes: Record<string, DesignSystemSchemaSlotRecipeInfo> = {}

  const sysRecipes = theme.recipes ?? {}
  const sysSlotRecipes = theme.slotRecipes ?? {}

  for (const key of Object.keys(sysRecipes)) {
    const recipe = sysRecipes[key]
    if (!recipe) continue

    const variantKeyMap = sys.cva(recipe).variantMap
    const variants: Record<string, DesignSystemSchemaRecipeVariantInfo> = {}

    for (const variantKey of Object.keys(variantKeyMap)) {
      const values = variantKeyMap[variantKey] ?? []
      const def = Reflect.get(recipe.defaultVariants ?? {}, variantKey)

      variants[variantKey] = {
        values: [...values],
        ...(def === undefined ? null : { default: def as string | boolean }),
      }
    }

    recipes[key] = { variants }
  }

  for (const key of Object.keys(sysSlotRecipes)) {
    const recipe = sysSlotRecipes[key]
    if (!recipe) continue

    const variantKeyMap = sys.sva(recipe).variantMap
    const variants: Record<string, DesignSystemSchemaRecipeVariantInfo> = {}

    for (const variantKey of Object.keys(variantKeyMap)) {
      const values = variantKeyMap[variantKey] ?? []
      const def = Reflect.get(recipe.defaultVariants ?? {}, variantKey)

      variants[variantKey] = {
        values: [...values],
        ...(def === undefined ? null : { default: def as string | boolean }),
      }
    }

    const slots = Array.isArray(recipe.slots) ? [...recipe.slots] : []

    slotRecipes[key] = {
      slots,
      variants,
    }
  }

  return {
    version: 1,
    mode,
    tokens: tokensByKind,
    props,
    ...(Object.keys(recipes).length ? { recipes } : null),
    ...(Object.keys(slotRecipes).length ? { slotRecipes } : null),
  }
}
