import { ChakraProvider as Provider, defaultSystem } from "@rechakra/react"

export const ChakraProvider = (props: { children: React.ReactNode }) => {
  return <Provider value={defaultSystem} {...props} />
}
