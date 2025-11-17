export interface ChakraCustomTypeGen {}

export type ChakraTokenTree = {
  [Key in string]?: true | ChakraTokenTree
}

type PrependPath<
  Prefix extends string,
  Segment extends string,
> = Prefix extends "" ? Segment : `${Prefix}.${Segment}`

type AsRecord<Value> = Value extends Record<string, any> ? Value : never

type CustomTokensRoot = ChakraCustomTypeGen extends { tokens: infer Tokens }
  ? Tokens
  : never

type CategoryConfig<Category extends string> = CustomTokensRoot extends {
  [Key in Category]: infer Tokens
}
  ? AsRecord<Tokens>
  : never

type FlattenTree<Tree, Prefix extends string> = [Tree] extends [never]
  ? never
  : Tree extends Record<string, any>
    ? {
        [Key in Extract<keyof Tree, string>]: Tree[Key] extends Record<
          string,
          any
        >
          ? FlattenTree<Tree[Key], PrependPath<Prefix, Key>>
          : PrependPath<Prefix, Key>
      }[Extract<keyof Tree, string>]
    : never

export type ChakraCustomTokenPath<Category extends string> = FlattenTree<
  CategoryConfig<Category>,
  Category
>

type CustomTokenKeys =
  CustomTokensRoot extends Record<string, any>
    ? keyof CustomTokensRoot & string
    : never

type CustomTokenUnion =
  CustomTokensRoot extends Record<string, any>
    ? {
        [Category in CustomTokenKeys]: FlattenTree<
          AsRecord<CustomTokensRoot[Category]>,
          Category
        >
      }[CustomTokenKeys]
    : never

export type ChakraCustomTokenUnion = CustomTokenUnion

type StripCategory<
  Category extends string,
  Value,
> = Value extends `${Category}.${infer Rest}` ? Rest : Value

export type ChakraCustomTokenValue<Category extends string> = StripCategory<
  Category,
  ChakraCustomTokenPath<Category>
>

export type ChakraCustomColorPalette = ChakraCustomTypeGen extends {
  tokens: { colors: infer Colors }
}
  ? Extract<keyof AsRecord<Colors>, string>
  : never
