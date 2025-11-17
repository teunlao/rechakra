import { Input, InputGroup } from "@rechakra/react"

export const InputWithEndAddon = () => {
  return (
    <InputGroup endAddon=".com">
      <Input placeholder="yoursite" />
    </InputGroup>
  )
}
