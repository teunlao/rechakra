"use client"

import { Button, Stack, TagsInput } from "@rechakra/react"
import { useTagsInput } from "@rechakra/react"

export const TagsInputWithStore = () => {
  const tags = useTagsInput()

  return (
    <Stack align="flex-start" gap="4">
      <TagsInput.RootProvider value={tags}>
        <TagsInput.Label>Tags: {JSON.stringify(tags.value)}</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Items />
          <TagsInput.Input placeholder="Add tag..." />
        </TagsInput.Control>
      </TagsInput.RootProvider>

      <Button variant="outline" size="sm" onClick={() => tags.clearValue()}>
        Clear All
      </Button>
    </Stack>
  )
}
