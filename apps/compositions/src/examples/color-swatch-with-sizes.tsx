import { HStack } from "@rechakra/react"
import { ColorSwatch } from "@rechakra/react"
import { For } from "@rechakra/react"

export const ColorSwatchWithSizes = () => {
  return (
    <HStack>
      <For each={["2xs", "xs", "sm", "md", "lg", "xl", "2xl"]}>
        {(size) => <ColorSwatch key={size} value="#bada55" size={size} />}
      </For>
    </HStack>
  )
}
