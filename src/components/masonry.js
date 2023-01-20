import {ThemeContext} from "css-system"
import React, {useContext} from "react"
import ReactMasonry, {ResponsiveMasonry} from "react-responsive-masonry"

import {View} from "./view"

export const Masonry = ({children, maxColumnsCount = 3, ...props}) => {
  if (!children) return

  const theme = useContext(ThemeContext)

  const displayTwocols = children.length < 10 && children.length % 2 === 0
  const mColumnsCount = displayTwocols ? 2 : maxColumnsCount

  return (
    <View
      as={ResponsiveMasonry}
      columnsCountBreakPoints={{
        0: 1,
        [theme.breakpointsInt.s]: 2,
        [theme.breakpointsInt.m]: mColumnsCount,
      }}
      {...props}
    >
      <ReactMasonry gutter={`${theme.space[2]}px`}>
        {React.Children.toArray(children).map((child, i) => (
          <View key={i}>{child}</View>
        ))}
      </ReactMasonry>
    </View>
  )
}
