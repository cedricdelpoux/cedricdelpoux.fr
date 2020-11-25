import React from "react"
import {View} from "./view"

export const Grid = ({css, children, ...props}) => (
  <View
    css={{
      display: "grid",
      ...css,
    }}
    {...props}
  >
    {children}
  </View>
)

export const GridItem = ({css, children, ...props}) => (
  <View css={{p: 2, alignItems: "center", gap: 1, ...css}} {...props}>
    {children}
  </View>
)
