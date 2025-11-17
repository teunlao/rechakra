import { Flex } from "@rechakra/react"
import { DecorativeBox } from "compositions/lib/decorative-box"

export const FlexBasic = () => {
  return (
    <Flex gap="4">
      <DecorativeBox height="10" />
      <DecorativeBox height="10" />
      <DecorativeBox height="10" />
    </Flex>
  )
}
