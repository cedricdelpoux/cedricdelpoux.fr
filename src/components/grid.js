import React from "react"

import {View} from "./view"

export const Grid = ({children, css, ...props}) => {
  return (
    <View
      css={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px,1fr))",
        columnGap: 2,
        rowGap: 2,
        "& > *": {
          width: "100%",
        },
        ...css,
      }}
      {...props}
    >
      {children}
    </View>
  )
}
