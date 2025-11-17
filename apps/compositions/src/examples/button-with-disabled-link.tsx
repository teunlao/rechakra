"use client"

import { Button } from "@rechakra/react"

export const ButtonWithDisabledLink = () => {
  return (
    <Button asChild>
      <a href="#" data-disabled="" onClick={(e) => e.preventDefault()}>
        Button
      </a>
    </Button>
  )
}
