import { HStack, Separator, Text } from "@rechakra/react"

export const SeparatorVertical = () => {
  return (
    <HStack gap="4">
      <Text>First</Text>
      <Separator orientation="vertical" height="4" />
      <Text>Second</Text>
    </HStack>
  )
}
