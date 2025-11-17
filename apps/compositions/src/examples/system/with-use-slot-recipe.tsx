"use client"

import { Box, useSlotRecipe } from "@rechakra/react"

export const SystemWithUseSlotRecipe = () => {
  const alert = useSlotRecipe({ key: "alert" })

  const styles = alert({ variant: "solid" })

  return (
    <Box css={styles.root}>
      <Box css={styles.title}>Alert Title</Box>
      <Box css={styles.description}>Alert Description</Box>
    </Box>
  )
}
