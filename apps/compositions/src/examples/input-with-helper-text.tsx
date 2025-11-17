import { Field, Input } from "@rechakra/react"

export const InputWithHelperText = () => {
  return (
    <Field.Root required>
      <Field.Label>
        Email <Field.RequiredIndicator />
      </Field.Label>
      <Input placeholder="Enter your email" />
      <Field.HelperText>We'll never share your email.</Field.HelperText>
    </Field.Root>
  )
}
