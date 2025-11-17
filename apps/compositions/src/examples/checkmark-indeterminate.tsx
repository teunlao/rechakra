import { Checkmark, HStack } from "@rechakra/react"

export const CheckmarkIndeterminate = () => {
  return (
    <HStack gap={4}>
      <Checkmark />
      <Checkmark checked />
      <Checkmark indeterminate />
    </HStack>
  )
}
