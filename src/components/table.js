import {ThemeContext} from "css-system"
import React, {useContext} from "react"

import {Button} from "./button"
import {View} from "./view"

export const tableCss = (theme) => ({
  alignSelf: {m: "center"},
  display: "block",
  overflow: "scroll",
  borderRadius: 3,
  "& > thead": {
    background: `linear-gradient(to right, ${theme.colors.secondary} 0%, ${theme.colors.secondary} 30%, ${theme.colors.primary} 100%)`,
    color: "#fff",
    textAlign: "left",
    "& > tr > th": {
      fontWeight: "normal",
      p: 1,
      "& > *": {
        display: "block",
        textAlign: "center",
      },
    },
  },
  "& > tbody": {
    backgroundColor: "backgroundLight",
    transitionDuration: theme.transition,
    transitionProperty: "background",
    "& > tr > td": {
      p: 1,
    },
  },
})

export const Table = ({css, ...props}) => {
  const theme = useContext(ThemeContext)
  return (
    <View
      as="table"
      css={{
        ...tableCss(theme),
        ...css,
      }}
      {...props}
    />
  )
}

export const TableButton = ({children, css, ...props}) => (
  <Button
    inset="2px"
    css={{
      display: "inline-flex",
      fontSize: 1,
      justifyContent: "center",
      ...css,
    }}
    {...props}
  >
    {children}
  </Button>
)