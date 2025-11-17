import { Input, InputGroup } from "@rechakra/react"
import { LuUser } from "react-icons/lu"

export const InputWithStartIcon = () => {
  return (
    <InputGroup startElement={<LuUser />}>
      <Input placeholder="Username" />
    </InputGroup>
  )
}
