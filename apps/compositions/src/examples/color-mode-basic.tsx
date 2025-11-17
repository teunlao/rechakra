"use client"

import { Button } from "@rechakra/react"
import { useColorMode } from "compositions/ui/color-mode"

export const ColorModeBasic = () => {
  const { toggleColorMode } = useColorMode()
  return (
    <Button variant="outline" onClick={toggleColorMode}>
      Toggle Mode
    </Button>
  )
}
