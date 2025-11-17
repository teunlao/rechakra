import { Button, FileUpload } from "@rechakra/react"
import { HiUpload } from "react-icons/hi"

export const FileUploadMultiple = () => {
  return (
    <FileUpload.Root maxFiles={5}>
      <FileUpload.HiddenInput />
      <FileUpload.Trigger asChild>
        <Button variant="outline" size="sm">
          <HiUpload /> Upload file
        </Button>
      </FileUpload.Trigger>
      <FileUpload.List showSize clearable />
    </FileUpload.Root>
  )
}
