import { Spinner, Text, VStack } from "@rechakra/react"

export const SpinnerWithLabel = () => {
  return (
    <VStack colorPalette="teal">
      <Spinner color="colorPalette.600" />
      <Text color="colorPalette.600">Loading...</Text>
    </VStack>
  )
}
