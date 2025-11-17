import { Checkbox, Link } from "@rechakra/react"

export const CheckboxWithLink = () => {
  return (
    <Checkbox.Root>
      <Checkbox.HiddenInput />
      <Checkbox.Control />
      <Checkbox.Label>
        I agree to the{" "}
        <Link colorPalette="teal" href="https://google.com">
          terms and conditions
        </Link>
      </Checkbox.Label>
    </Checkbox.Root>
  )
}
