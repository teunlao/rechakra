import { Progress } from "@rechakra/react"

export const ProgressIndeterminate = () => {
  return (
    <Progress.Root maxW="240px" value={null}>
      <Progress.Track>
        <Progress.Range />
      </Progress.Track>
    </Progress.Root>
  )
}
