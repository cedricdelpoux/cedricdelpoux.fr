import {ThemeContext} from "css-system"
import React, {useContext} from "react"
import ReactMasonry, {ResponsiveMasonry} from "react-responsive-masonry"
import {View} from "./view"

export const Masonry = ({children, css, ...props}) => {
  const theme = useContext(ThemeContext)

  return (
    <View css={css} {...props}>
      <ResponsiveMasonry>
        <ReactMasonry gutter={`${theme.space[3]}px`}>{children}</ReactMasonry>
      </ResponsiveMasonry>
    </View>
  )
}
