import { Checkmark, Stack } from "@rechakra/react"

export const CheckmarkBasic = () => {
  return (
    <Stack>
      <Checkmark />
      <Checkmark checked />
      <Checkmark indeterminate />
      <Checkmark disabled />
      <Checkmark checked disabled />
      <Checkmark indeterminate disabled />
    </Stack>
  )
}
