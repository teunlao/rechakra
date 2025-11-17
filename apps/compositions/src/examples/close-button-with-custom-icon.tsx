import { CloseButton } from "@rechakra/react"
import { HiX } from "react-icons/hi"

export const CloseButtonWithCustomIcon = () => {
  return (
    <CloseButton variant="ghost" aria-label="Close">
      <HiX />
    </CloseButton>
  )
}
