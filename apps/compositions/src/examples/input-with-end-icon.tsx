import { Input, InputGroup } from "@rechakra/react"
import { LuMail } from "react-icons/lu"

export const InputWithEndIcon = () => {
  return (
    <InputGroup endElement={<LuMail />}>
      <Input placeholder="Email" />
    </InputGroup>
  )
}
