import { Input, InputGroup } from "@rechakra/react"

export const InputWithStartAndEndText = () => {
  return (
    <InputGroup startElement="$" endElement="USD">
      <Input placeholder="0.00" />
    </InputGroup>
  )
}
