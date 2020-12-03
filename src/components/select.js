import {ThemeContext} from "css-system"
import React, {useContext} from "react"
import {Text} from "./text"
import {View} from "./view"

export const Select = ({css, ...props}) => (
  <Text
    as="select"
    css={{
      background: "transparent",
      fontFamily: "inherit",
      fontSize: "inherit",
      color: "inherit",
      border: 0,
      cursor: "pointer",
      ...css,
    }}
    {...props}
  />
)

export const SelectGradient = ({css, ...props}) => {
  const theme = useContext(ThemeContext)
  return (
    <View
      css={{
        background: theme.colors.gradient,
        p: "2px",
        borderRadius: 2,
      }}
    >
      <Select
        css={{
          backgroundColor: "backgroundLight",
          transitionProperty: "background",
          transitionDuration: theme.transition,
          p: "4px",
          borderRadius: 2,
          ...css,
        }}
        {...props}
      />
    </View>
  )
}
