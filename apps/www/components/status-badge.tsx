import { Badge, BadgeProps } from "@rechakra/react"

export const StatusBadge = (props: BadgeProps) => (
  <Badge
    size="xs"
    textStyle="xs"
    variant="solid"
    colorPalette="teal"
    textTransform="capitalize"
    {...props}
  />
)
