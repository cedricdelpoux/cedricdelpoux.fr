import {animated} from "@react-spring/web"
import {ThemeContext, createPrimitive} from "css-system"
import {useContext} from "react"

export const Text = createPrimitive(
  animated.div,
  ({css, gradient, ellipsis, ...props}) => {
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
        ...(ellipsis
          ? {
              textOverflow: "ellipsis",
              overflow: "hidden",
              flex: 1,
              whiteSpace: "nowrap",
            }
          : {}),
        ...css,
      },
      ...props,
    }
  }
)
