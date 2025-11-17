import { Input, InputGroup } from "@rechakra/react"

export const InputWithEndText = () => {
  return (
    <InputGroup endElement=".com">
      <Input placeholder="yoursite" />
    </InputGroup>
  )
}
