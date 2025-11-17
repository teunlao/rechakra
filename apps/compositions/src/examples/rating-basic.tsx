import { RatingGroup } from "@rechakra/react"

export const RatingBasic = () => {
  return (
    <RatingGroup.Root count={5} defaultValue={3} size="sm">
      <RatingGroup.HiddenInput />
      <RatingGroup.Control />
    </RatingGroup.Root>
  )
}
