import { Input, InputGroup } from "@rechakra/react"

export const InputWithStartElementEndAddon = () => {
  return (
    <InputGroup startElement="$" endAddon="USD">
      <Input placeholder="0.00" />
    </InputGroup>
  )
}
