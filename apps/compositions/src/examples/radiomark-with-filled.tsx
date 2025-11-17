import { HStack, Radiomark } from "@rechakra/react"

export const RadiomarkWithFilled = () => {
  return (
    <HStack gap={4}>
      <Radiomark variant="outline" />
      <Radiomark variant="outline" checked />
      <Radiomark variant="outline" filled />
      <Radiomark variant="outline" filled checked />
    </HStack>
  )
}
