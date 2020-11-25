import {ThemeContext} from "css-system"
import React, {useContext} from "react"

import {View} from "./view"

export const Html = ({html, css, fluid, ...props}) => {
  const theme = useContext(ThemeContext)

  if (!html) return null

  return (
    <View
      css={{
        flex: 1,
        fontSize: {_: 3, s: 4},
        "& > *:first-child": {
          mt: 0,
        },
        "& > *:not([class^=gatsby-resp-image]):not(table):not(h1):not(h2):not(h3):not(h4):not(h5)": {
          mx: "auto",
          px: {_: 2, s: 0},
          width: fluid ? "100%" : {m: 680},
          maxWidth: "100%",
        },
        "& > [class^=gatsby-resp-image]": {
          width: "100%",
          maxWidth: theme.breakpoints.m,
          margin: "0 auto",
          "& > figcaption": {
            textAlign: "center",
            fontStyle: "italic",
          },
        },
        "& > h1, & > h2, & > h3, & > h4, & > h5": {
          alignSelf: "center",
          // textAlign: "center",
          background: theme.colors.gradient,
          color: "text",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          lineHeight: "1.8em",
        },
        "& > h1::after, & > h2::after, & > h3::after, & > h4::after, & > h5::after": {
          content: '""',
          display: "block",
          mx: "auto",
          mt: 2,
          width: "2em",
          height: ".15em",
          borderRadius: 999,
          backgroundImage: "inherit",
        },
        "& > table": {
          width: "100%",
          overflow: "hidden",
          borderRadius: 3,
          borderCollapse: "collapse",
          "& th, & td": {
            p: 1,
          },
          "& th": {
            color: "#fff",
            textAlign: "left",
            borderLeft: "1px solid",
            borderTop: "1px solid",
            borderColor: "background",
          },
          "& thead": {
            background: `linear-gradient(to right, ${theme.colors.secondary} 0%, ${theme.colors.secondary} 30%, ${theme.colors.primary} 100%)`,
          },
          "& td": {
            borderBottom: "1px solid",
            borderLeft: "1px solid",
            borderColor: "background",
            backgroundColor: "backgroundLight",
          },
          "& tr > td:last-child, & tr > th:last-child": {
            borderRight: "1px solid",
            borderColor: "background",
          },
        },
        "& .anchor > svg > path:first-child": {
          fill: "url(#svg-gradient)",
        },
        "& a:not(.anchor)": {
          position: "relative",
          color: "inherit",
          textDecoration: "none",
          transitionDuration: theme.transition,
          transitionProperty: "background-size",
          background: theme.colors.gradient,
          backgroundSize: "100% 2px",
          backgroundPosition: "0 100%",
          backgroundRepeat: "no-repeat",
          "&:hover": {
            backgroundSize: "100% 100%",
          },
        },
        "& > ul ": {
          listStyleImage: "gradient",
        },
        "& > p > iframe": {
          maxWidth: "100%",
        },
        ...css,
      }}
      dangerouslySetInnerHTML={{__html: html}}
      {...props}
    />
  )
}
