import { Progress } from "@rechakra/react"

export const ProgressBasic = () => {
  return (
    <Progress.Root maxW="240px">
      <Progress.Track>
        <Progress.Range />
      </Progress.Track>
    </Progress.Root>
  )
}
