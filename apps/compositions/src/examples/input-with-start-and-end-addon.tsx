import { Input, InputGroup } from "@rechakra/react"

export const InputWithStartAndEndAddon = () => {
  return (
    <InputGroup startAddon="$" endAddon="USD">
      <Input placeholder="0.00" />
    </InputGroup>
  )
}
