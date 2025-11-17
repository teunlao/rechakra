"use client"

import { ChakraProvider, defaultSystem } from "@rechakra/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "compositions/ui/color-mode"

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
