import React from "react"
import {animated} from "react-spring"

import {Text} from "./text"

export const Title = ({
  css: {center = true, ...css} = {},
  as,
  children,
  ...props
}) => {
  return (
    <Text
      as={as && animated[as]}
      css={{
        "&:first-child": {
          mt: 0,
        },
        mb: 0,
        alignSelf: "center",
        textAlign: center ? "center" : undefined,
        lineHeight: "1.8em",
        position: "relative",
        pb: 2,
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "2em",
          height: "0.15em",
          borderRadius: 999,
          backgroundImage: "inherit",
        },
        "& > a.anchor": {
          visibility: "hidden",
          position: "absolute",
          left: "-30px",
          "& > svg > path:first-child": {
            fill: "currentColor",
          },
        },
        "&:hover > a.anchor": {
          visibility: "visible",
        },
        ...css,
      }}
      gradient
      {...props}
    >
      {children}
    </Text>
  )
}
