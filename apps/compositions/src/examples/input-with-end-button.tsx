import { Button, Group, Input } from "@rechakra/react"

export const InputWithEndButton = () => {
  return (
    <Group attached w="full" maxW="sm">
      <Input flex="1" placeholder="Enter your email" />
      <Button bg="bg.subtle" variant="outline">
        Submit
      </Button>
    </Group>
  )
}
