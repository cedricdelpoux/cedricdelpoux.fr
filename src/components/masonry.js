import {ThemeContext} from "css-system"
import React, {useContext} from "react"

import {View} from "./view"

export const Masonry = ({children, css, ...props}) => {
  const theme = useContext(ThemeContext)

  return (
    <View
      css={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px,1fr))",
        columnGap: 2,
        rowGap: 2,
        ...css,
      }}
      {...props}
    >
      {children}
    </View>
  )
}
