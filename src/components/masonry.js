import {ThemeContext} from "css-system"
import React, {useContext} from "react"
import ReactMasonry, {ResponsiveMasonry} from "react-responsive-masonry"
import {useTrail} from "react-spring"
import {View} from "./view"

export const Masonry = ({children, css, animated = true, ...props}) => {
  const theme = useContext(ThemeContext)
  const childrenArray = React.Children.toArray(children)
  const animations = useTrail(childrenArray.length, {
    from: {opacity: 0, transform: "translate3d(0, -30px, 0)"},
    to: {opacity: 1, transform: "translate3d(0, 0, 0)"},
  })

  return (
    <View css={{...css}} {...props}>
      <ResponsiveMasonry>
        <ReactMasonry gutter={`${theme.space[3]}px`}>
          {React.Children.map(childrenArray, (child, i) => (
            <View key={child.key || i} style={animated ? animations[i] : {}}>
              {child}
            </View>
          ))}
        </ReactMasonry>
      </ResponsiveMasonry>
    </View>
  )
}
