import { Field, Textarea } from "@rechakra/react"

export const FieldWithTextarea = () => {
  return (
    <Field.Root>
      <Field.Label>Email</Field.Label>
      <Textarea placeholder="Email" />
    </Field.Root>
  )
}
