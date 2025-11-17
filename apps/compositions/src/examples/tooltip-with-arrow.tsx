import { Button } from "@rechakra/react"
import { Tooltip } from "compositions/ui/tooltip"

export const TooltipWithArrow = () => {
  return (
    <Tooltip showArrow content="This is the tooltip content">
      <Button variant="outline" size="sm">
        Hover me
      </Button>
    </Tooltip>
  )
}
