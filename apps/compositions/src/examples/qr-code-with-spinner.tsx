import { AbsoluteCenter, Box, QrCode, Spinner } from "@rechakra/react"

export const QrCodeWithSpinner = () => {
  return (
    <Box position="relative">
      <QrCode.Root value="https://www.google.com">
        <QrCode.Frame>
          <QrCode.Pattern />
        </QrCode.Frame>

        <AbsoluteCenter bg="bg/80" boxSize="100%">
          <Spinner color="red" />
        </AbsoluteCenter>
      </QrCode.Root>
    </Box>
  )
}
