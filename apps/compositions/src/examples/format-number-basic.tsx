import { FormatNumber, Text } from "@rechakra/react"

export const FormatNumberBasic = () => {
  return (
    <Text textStyle="lg">
      <FormatNumber value={1450.45} />
    </Text>
  )
}
