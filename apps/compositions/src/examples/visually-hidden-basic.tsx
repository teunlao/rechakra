import { Button, VisuallyHidden } from "@rechakra/react"
import { LuBell } from "react-icons/lu"

export const VisuallyHiddenBasic = () => {
  return (
    <Button>
      <LuBell /> 3 <VisuallyHidden>Notifications</VisuallyHidden>
    </Button>
  )
}
