import { SegmentGroup } from "@rechakra/react"

export const SegmentedControlVertical = () => {
  return (
    <SegmentGroup.Root defaultValue="React" orientation="vertical">
      <SegmentGroup.Indicator />
      <SegmentGroup.Items items={["React", "Vue", "Solid"]} />
    </SegmentGroup.Root>
  )
}
