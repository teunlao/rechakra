import { AbsoluteCenter, Box } from "@rechakra/react"
import { LuPhone } from "react-icons/lu"

export const CenterWithAbsolute = () => {
  return (
    <Box position="relative" h="100px">
      <AbsoluteCenter bg="tomato" p="4" color="white" axis="both">
        <LuPhone />
      </AbsoluteCenter>
    </Box>
  )
}
