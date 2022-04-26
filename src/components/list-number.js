import {ThemeContext} from "css-system"
import React, {useContext} from "react"

import {View} from "./view"

export const ListNumber = ({children, css}) => {
  const theme = useContext(ThemeContext)
  return (
    <View
      as="ol"
      css={{
        display: "block",
        counterReset: "li",
        listStyleType: "none",
        "& > li": {
          counterIncrement: "li",
          "&::before": {
            content: "counter(li)",
            display: "inline-block",
            background: theme.colors.gradient,
            color: "text",
            "-webkit-background-clip": "text",
            "-moz-background-clip": "text",
            "-o-background-clip": "text",
            "background-clip": "text",
            "-webkit-text-fill-color": "transparent",
            width: "1em",
            ml: "-1.5em",
            mr: "0.5em",
            textAlign: "right",
            direction: "rtl",
            // mb: "2px",
          },
        },
        ...css,
      }}
    >
      {children}
    </View>
  )
}
