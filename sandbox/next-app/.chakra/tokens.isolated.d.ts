import "@chakra-ui/react/typegen"

declare module "@chakra-ui/react/typegen" {
  interface ChakraCustomTypeGen {
    tokens: {
      colors: {
        brand: {
          primary: true
          secondary: true
        }
      }
    }
  }
}
