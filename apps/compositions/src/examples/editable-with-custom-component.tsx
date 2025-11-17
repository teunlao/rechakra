import { Editable, Input } from "@rechakra/react"

export const EditableWithCustomComponent = () => {
  return (
    <Editable.Root defaultValue="Click to edit">
      <Editable.Preview>
        <Input />
      </Editable.Preview>
    </Editable.Root>
  )
}
