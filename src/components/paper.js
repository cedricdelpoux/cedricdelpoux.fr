import {ThemeContext} from "css-system"
import React, {useContext} from "react"

import {Link} from "./link"
import {Icon} from "./icon"
import {Text} from "./text"
import {View} from "./view"

export const Paper = ({css, deps, children, ...props}) => {
  const theme = useContext(ThemeContext)
  const Component = props.to ? Link : View
  return (
    <Component
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
    </Component>
  )
}

export const PaperMetadata = ({items}) => (
  <View
    css={{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      px: 3,
    }}
  >
    {items.map(
      (item, i) =>
        item && (
          <View key={i} css={{flexDirection: "row", alignItems: "center"}}>
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
          </View>
        )
    )}
  </View>
)
