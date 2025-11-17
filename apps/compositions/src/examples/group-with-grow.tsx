import { Button, Group } from "@rechakra/react"

export const GroupWithGrow = () => {
  return (
    <Group grow>
      <Button variant="outline">First</Button>
      <Button variant="outline">Second</Button>
      <Button variant="outline">Third</Button>
    </Group>
  )
}
