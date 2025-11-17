import { Switch } from "@rechakra/react"

export const SwitchWithDisabled = () => {
  return (
    <Switch.Root disabled>
      <Switch.HiddenInput />
      <Switch.Control />
      <Switch.Label>Activate Chakra</Switch.Label>
    </Switch.Root>
  )
}
