import { Stack, StackSeparator } from "@rechakra/react"
import { DecorativeBox } from "compositions/lib/decorative-box"

export const StackWithSeparator = () => {
  return (
    <Stack separator={<StackSeparator />}>
      <DecorativeBox h="20" />
      <DecorativeBox h="20" />
      <DecorativeBox h="20" />
    </Stack>
  )
}
