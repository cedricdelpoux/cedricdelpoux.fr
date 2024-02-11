import {ThemeContext} from "css-system"
import React, {useContext} from "react"

import {Button} from "./button"
import {Text} from "./text"
import {View} from "./view"

export const tableCss = (theme) => ({
  alignSelf: {m: "center"},
  display: "block",
  overflow: "scroll",
  borderCollapse: "separate",
  backgroundColor: "background",
  borderRadius: 3,
  "& > thead": {
    color: "#fff",
    textAlign: "left",
    background: `linear-gradient(to right, ${theme.colors.secondary} 0%, ${theme.colors.secondary} 30%, ${theme.colors.primary} 100%)`,
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
    transitionDuration: theme.transition,
    transitionProperty: "background",
    "& > tr > td": {
      p: 1,
      backgroundColor: "backgroundLight",
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

export const TableCell = ({as = "td", css, align = "left", ...props}) => (
  <Text
    as={as}
    css={{
      display: "table-cell",
      whiteSpace: "nowrap",
      textAlign: align,
      ...css,
    }}
    {...props}
  ></Text>
)

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
