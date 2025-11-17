import { ProgressCircle } from "@rechakra/react"

export const ProgressCircleWithRoundCap = () => {
  return (
    <ProgressCircle.Root value={75}>
      <ProgressCircle.Circle>
        <ProgressCircle.Track />
        <ProgressCircle.Range strokeLinecap="round" />
      </ProgressCircle.Circle>
    </ProgressCircle.Root>
  )
}
