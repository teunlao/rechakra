import { Input } from "@rechakra/react"

export const InputWithPlaceholderStyle = () => {
  return (
    <Input
      color="teal"
      placeholder="custom placeholder"
      _placeholder={{ color: "inherit" }}
    />
  )
}
