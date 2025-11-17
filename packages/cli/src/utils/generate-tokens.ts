import type { SystemContext } from "@rechakra/react"
import { pretty } from "./pretty.js"
import { capitalize, unionType } from "./shared.js"

export async function generateTokens(sys: SystemContext) {
  const { allTokens, tokenMap, colorPaletteMap, categoryMap } = sys.tokens

  const isTokenEmpty = allTokens.length === 0

  const set = new Set<string>()

  set.add(
    'import type { ChakraCustomColorPalette, ChakraCustomTokenUnion, ChakraCustomTokenValue } from "@rechakra/react/typegen"',
  )

  const baseTokenUnion = isTokenEmpty
    ? "string"
    : unionType(Array.from(tokenMap.keys()))

  set.add(`export type Token = ${baseTokenUnion} | ChakraCustomTokenUnion`)

  const result = new Set<string>(["export type Tokens = {"])

  if (isTokenEmpty) {
    result.add("[token: string]: string")
  } else {
    const colorPaletteKeys = Array.from(colorPaletteMap.keys())

    const colorPaletteType = colorPaletteKeys.length
      ? `${unionType(colorPaletteKeys)} | ChakraCustomColorPalette`
      : "ChakraCustomColorPalette"

    set.add(`export type ColorPalette = ${colorPaletteType}`)

    for (const [key, value] of categoryMap.entries()) {
      const typeName = capitalize(key)
      const categoryValues = Array.from(value.keys())
      const customTypeRef = `ChakraCustomTokenValue<"${key}">`
      const union = categoryValues.length
        ? `${unionType(categoryValues)} | ${customTypeRef}`
        : customTypeRef
      set.add(`export type ${typeName}Token = ${union}`)
      result.add(`\t\t${key}: ${typeName}Token`)
    }
  }

  result.add("} & { [token: string]: never }")

  set.add(Array.from(result).join("\n"))

  return pretty(Array.from(set).join("\n\n"))
}
