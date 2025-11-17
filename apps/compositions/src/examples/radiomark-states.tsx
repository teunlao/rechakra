import { HStack, Radiomark } from "@rechakra/react"

export const RadiomarkStates = () => {
  return (
    <HStack gap={4}>
      <Radiomark />
      <Radiomark checked />
      <Radiomark disabled />
      <Radiomark checked disabled />
    </HStack>
  )
}
