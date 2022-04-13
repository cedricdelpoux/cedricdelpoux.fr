import {ThemeContext} from "css-system"
import React, {useContext} from "react"
import ReactMasonry, {ResponsiveMasonry} from "react-responsive-masonry"

import {View} from "./view"

export const Masonry = ({children, ...props}) => {
  const theme = useContext(ThemeContext)

  return (
    <View
      as={ResponsiveMasonry}
      columnsCountBreakPoints={{
        0: 1,
        [theme.breakpointsInt.s]: 2,
        [theme.breakpointsInt.m]: 3,
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
