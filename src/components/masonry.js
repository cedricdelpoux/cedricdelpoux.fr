import React from "react"

import {View} from "./view"

export const Masonry = ({children, css, ...props}) => {
  return (
    <View
      css={{
        display: "block",
        columnCount: {_: 1, s: 2, m: 3},
        columnGap: 2,
        ...css,
      }}
      {...props}
    >
      {React.Children.toArray(children).map((child, i) => (
        <View key={i} css={{breakInside: "avoid", mb: 2}}>
          {child}
        </View>
      ))}
    </View>
  )
}
