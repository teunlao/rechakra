import { Radiomark, Stack } from "@rechakra/react"

export const RadiomarkBasic = () => {
  return (
    <Stack>
      <Radiomark />
      <Radiomark checked />
      <Radiomark disabled />
      <Radiomark checked disabled />
    </Stack>
  )
}
