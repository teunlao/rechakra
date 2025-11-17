import { HStack, Kbd } from "@rechakra/react"

export const KbdWithCombinations = () => {
  return (
    <HStack gap="1">
      <Kbd>ctrl</Kbd>+<Kbd>shift</Kbd>+<Kbd>del</Kbd>
    </HStack>
  )
}
