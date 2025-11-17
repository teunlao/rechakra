import { Input, InputGroup } from "@rechakra/react"

export const InputWithStartAddon = () => {
  return (
    <InputGroup startAddon="https://">
      <Input placeholder="yoursite.com" />
    </InputGroup>
  )
}
