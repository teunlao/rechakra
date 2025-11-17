import { Badge, Loader } from "@rechakra/react"

export const LoaderWithBadge = () => {
  return (
    <Badge>
      <Loader text="Loading...">Click me</Loader>
    </Badge>
  )
}
