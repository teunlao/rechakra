import "@rechakra/react/typegen"

declare module "@rechakra/react/typegen" {
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
