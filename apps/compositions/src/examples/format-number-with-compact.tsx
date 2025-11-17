import { FormatNumber, Text } from "@rechakra/react"

export const FormatNumberWithCompact = () => {
  return (
    <Text textStyle="lg">
      <FormatNumber value={1500000} notation="compact" compactDisplay="short" />
    </Text>
  )
}
