import { Editable } from "@rechakra/react"

export const EditableWithDoubleClick = () => (
  <Editable.Root defaultValue="Double click to edit" activationMode="dblclick">
    <Editable.Preview />
    <Editable.Input />
  </Editable.Root>
)
