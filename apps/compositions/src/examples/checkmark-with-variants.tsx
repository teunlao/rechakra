import { Checkmark, For, HStack } from "@rechakra/react"

export const CheckmarkWithVariants = () => {
  return (
    <HStack gap={4}>
      <For each={["solid", "outline", "subtle", "plain", "inverted"]}>
        {(variant) => <Checkmark key={variant} variant={variant} checked />}
      </For>
    </HStack>
  )
}
