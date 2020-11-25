import {animated} from "react-spring"
import {createPrimitive, ThemeContext} from "css-system"
import {useContext} from "react"

export const Text = createPrimitive(
  animated.div,
  ({css, gradient, ...props}) => {
    const theme = useContext(ThemeContext)
    return {
      css: {
        display: "inline",
        minWidth: 0,
        minHeight: 0,
        flex: "none",
        ...(gradient
          ? {
              background: theme.colors.gradient,
              color: "text",
              "-webkit-background-clip": "text",
              "-moz-background-clip": "text",
              "-o-background-clip": "text",
              "background-clip": "text",
              "-webkit-text-fill-color": "transparent",
            }
          : {}),
        ...css,
      },
      ...props,
    }
  }
)
