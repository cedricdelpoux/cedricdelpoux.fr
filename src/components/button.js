import {faAngleRight} from "@fortawesome/pro-light-svg-icons"
import {animated} from "@react-spring/web"
import {ThemeContext} from "css-system"
import React, {useContext} from "react"

import {Flag} from "./flag"
import {Icon} from "./icon"
import {Text} from "./text"
import {View} from "./view"

export const Button = ({
  children,
  css,
  flag,
  icon,
  inset,
  noArrow,
  text,
  ...props
}) => {
  const theme = useContext(ThemeContext)
  return (
    <View
      as={animated.button}
      css={{
        position: "relative",
        color: "text",
        transitionProperty: "color",
        py: 1,
        px: 2,
        fontSize: "inherit",
        // fontWeight: "bold",
        border: 0,
        borderRadius: 999,
        cursor: "pointer",
        outline: "none",
        alignItems: "center",
        flexDirection: "row",
        gap: 1,
        zIndex: 0,
        "&::before, &::after": {
          content: '""',
          position: "absolute",
          borderRadius: 999,
        },
        "&::before": {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          zIndex: -1,
          background: theme.colors.gradient,
        },
        "&::after": {
          inset: inset || "4px",
          bg: "background",
          zIndex: -1,
          opacity: 1,
          transitionDuration: theme.transition,
          transitionProperty: "background, opacity",
        },
        "&:focus": {
          color: "#fff",
          "&::after": {
            opacity: 0,
          },
        },
        "&:hover": {
          color: "#fff",
          "&::after": {
            opacity: 0,
          },
        },
        ...css,
      }}
      {...props}
    >
      {children ? (
        children
      ) : (
        <>
          {icon && <Icon icon={icon} />}
          {flag && <Flag country={flag} css={{width: "25px"}} />}
          {text && <Text>{text}</Text>}
        </>
      )}
      {props.to && !noArrow && <Icon icon={faAngleRight} />}
    </View>
  )
}
