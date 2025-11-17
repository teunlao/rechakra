import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  strictTokens: true,
  theme: {
    tokens: {
      colors: {
        brand: {
          primary: { value: "#4C6FFF" },
          secondary: { value: "#FF6B6B" },
        },
      },
    },
  },
})

const system = createSystem(defaultConfig, config)

export default system
