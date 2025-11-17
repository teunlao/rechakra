import type { SystemContext } from "@rechakra/react"
import { defaultSystem } from "@rechakra/react"
import { pretty } from "./pretty.js"

interface TokenNode {
  [key: string]: TokenNode | true
}

const defaultTokenNames = new Set(defaultSystem.tokens.tokenMap.keys())

const identifierRegex = /^[A-Za-z_$][\w$]*$/

const formatKey = (key: string) =>
  identifierRegex.test(key) ? key : JSON.stringify(key)

function insertToken(target: Record<string, TokenNode>, name: string) {
  const segments = name.split(".")
  if (segments.length < 2) return

  const [category, ...rest] = segments
  let node = (target[category] ??= {})

  rest.forEach((segment, index) => {
    const isLeaf = index === rest.length - 1

    if (isLeaf) {
      node[segment] = true
      return
    }

    const current = node[segment]
    if (!current || current === true) {
      node[segment] = {}
    }
    node = node[segment] as TokenNode
  })
}

function printTree(node: Record<string, TokenNode | true>, depth = 0): string {
  const indent = "  ".repeat(depth)
  const entries = Object.entries(node).sort(([a], [b]) =>
    a.localeCompare(b, "en-US"),
  )

  if (!entries.length) {
    return "{}"
  }

  const lines = ["{"]

  for (const [key, value] of entries) {
    const formattedKey = formatKey(key)
    if (value === true) {
      lines.push(`${indent}  ${formattedKey}: true`)
      continue
    }

    lines.push(`${indent}  ${formattedKey}: ${printTree(value, depth + 1)}`)
  }

  lines.push(`${indent}}`)
  return lines.join("\n")
}

export function generateIsolatedTokens(
  sys: SystemContext,
  typegenImport = "@rechakra/react",
) {
  const tree: Record<string, TokenNode> = {}
  let hasCustomTokens = false

  for (const name of sys.tokens.tokenMap.keys()) {
    if (name.includes(".colorPalette.")) continue
    if (defaultTokenNames.has(name)) continue
    hasCustomTokens = true
    insertToken(tree, name)
  }

  const typegenTarget = `${typegenImport}/typegen`
  const header = `import "${typegenTarget}"`

  if (!hasCustomTokens) {
    return pretty(
      `${header}

declare module "${typegenTarget}" {
  interface ChakraCustomTypeGen {}
}
`,
    )
  }

  const tokensLiteral = printTree(tree, 2)

  return pretty(
    `${header}

declare module "${typegenTarget}" {
  interface ChakraCustomTypeGen {
    tokens: ${tokensLiteral}
  }
}
`,
  )
}
