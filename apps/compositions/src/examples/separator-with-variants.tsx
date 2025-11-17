import { Separator, Stack } from "@rechakra/react"

export const SeparatorWithVariants = () => {
  return (
    <Stack>
      <Separator variant="solid" />
      <Separator variant="dashed" />
      <Separator variant="dotted" />
    </Stack>
  )
}
