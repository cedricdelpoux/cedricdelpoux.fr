import {ThemeContext} from "css-system"
import React, {useContext, useEffect, useState} from "react"

import {Text} from "./text"

export const Switch = ({onChange}) => {
  const theme = useContext(ThemeContext)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    onChange(checked)
  }, [checked])

  return (
    <Text
      as="label"
      css={{
        cursor: "pointer",
        height: 30,
        width: 60,
        bg: "backgroundLight",
        borderRadius: 100,
        position: "relative",
        "&:after": {
          content: "''",
          position: "absolute",
          top: 0,
          width: 30,
          height: 30,
          background: `linear-gradient(to right, ${theme.colors.secondary} 0%, ${theme.colors.primary} 100%)`,
          borderRadius: 90,
          transitionDuration: theme.transition,
          left: checked ? "100%" : "0%",
          transform: checked ? "translateX(-100%)" : "translateX(0)",
        },
      }}
      deps={[checked]}
    >
      <Text
        as="input"
        type="checkbox"
        css={{
          height: 0,
          width: 0,
          visibility: "hidden",
        }}
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
    </Text>
  )
}
