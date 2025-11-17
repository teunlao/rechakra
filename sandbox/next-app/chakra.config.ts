import demoThemeConfig from "@rechakra/demo-theme"
import {
  createSystem,
  defaultConfig,
  defineConfig,
  mergeConfigs,
} from "@rechakra/react"

const localConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          temp: { value: "#4C6FFF" },
        },
      },
    },
  },
})

const system = createSystem(
  defaultConfig,
  mergeConfigs(demoThemeConfig, localConfig),
)

export default system
