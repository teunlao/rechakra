import { Progress, Stack } from "@rechakra/react"

export const ProgressExplorer = () => {
  return (
    <Stack gap="8" align="start">
      <Progress.Root value={60} max={100} width="240px">
        <Progress.Label>Loading…</Progress.Label>
        <Progress.Track>
          <Progress.Range />
        </Progress.Track>
        <Progress.ValueText />
      </Progress.Root>
    </Stack>
  )
}
