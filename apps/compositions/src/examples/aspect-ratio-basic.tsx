import { AspectRatio, Center } from "@rechakra/react"

export const AspectRatioBasic = () => {
  return (
    <AspectRatio bg="bg.muted" ratio={16 / 9}>
      <Center fontSize="xl">16 / 9</Center>
    </AspectRatio>
  )
}
