import {ThemeContext} from "css-system"
import React, {useContext} from "react"

import {Icon} from "./icon"
import {Link} from "./link"
import {Text} from "./text"
import {View} from "./view"

export const Paper = ({css, deps, children, ...props}) => {
  const theme = useContext(ThemeContext)
  return (
    <View
      as={props.to && Link}
      css={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "backgroundLight",
        boxShadow: theme.boxShadow,
        transitionProperty: "background, transform",
        transitionDuration: theme.transition,
        borderRadius: 2,
        overflow: "hidden",
        "&:hover": (props.to || props.onClick) && {
          cursor: "pointer",
          transform: "translate3d(0, -4px, 0)",
        },
        p: 3,
        ...css,
      }}
      deps={deps}
      {...props}
    >
      {children}
    </View>
  )
}

export const PaperMetadata = ({items, css}) => (
  <View
    css={{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      px: 3,
      gap: {_: 1, s: 2},
      overflow: "hidden",
      ...css,
    }}
  >
    {items.map(
      (item, i) =>
        item && (
          <Text
            key={i}
            css={{
              flexDirection: "row",
              alignItems: "center",
              display: {_: i >= 2 ? "none" : "inline", s: "inline"},
            }}
          >
            <Icon
              icon={item.icon}
              css={{
                fontSize: "20px",
              }}
              gradient
            />
            <Text
              css={{
                ml: 1,
                "&::first-letter": {
                  textTransform: "uppercase",
                },
              }}
            >
              {item.label}
            </Text>
          </Text>
        )
    )}
  </View>
)

export const PaperIcon = ({icon, css}) => (
  <View
    css={{
      fontSize: 3,
      borderRadius: "50%",
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "background",
      ...css,
    }}
  >
    <Icon icon={icon} gradient />
  </View>
)
