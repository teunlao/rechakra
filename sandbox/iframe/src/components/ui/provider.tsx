"use client"

import { ChakraProvider, defaultSystem } from "@rechakra/react"
import { ThemeProvider, type ThemeProviderProps } from "next-themes"

export function Provider(props: ThemeProviderProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ThemeProvider {...props} />
    </ChakraProvider>
  )
}
