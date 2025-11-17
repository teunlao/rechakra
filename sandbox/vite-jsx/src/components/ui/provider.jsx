"use client"

import { ChakraProvider, defaultSystem } from "@rechakra/react"
import { ColorModeProvider } from "./color-mode"

export function Provider(props) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
