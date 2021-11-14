import {animated} from "@react-spring/web"
import {ThemeContext, createPrimitive, useGap} from "css-system"
import {useContext} from "react"

export const View = createPrimitive(animated.div, ({css, ...props}) => {
  const theme = useContext(ThemeContext)
  return {
    css: useGap({
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      justifyContent: "flex-start",
      transitionDuration: theme.transition,
      transitionProperty: "background",
      minWidth: 0,
      minHeight: 0,
      flex: "none",
      ...css,
    }),
    ...props,
  }
})
