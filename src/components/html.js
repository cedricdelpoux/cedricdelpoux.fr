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
        mx: "auto",
        width: fluid ? "100%" : {m: 680},
        maxWidth: "100%",
        "& > *:first-child": {
          mt: 0,
        },
        "& img": {
          borderRadius: 2,
        },
        "& > [class^=gatsby-resp-image]": {
          overflow: "hidden",
          width: "100%",
          m: 0,
          mb: 0,
          "& > figcaption": {
            mt: 1,
            textAlign: "center",
            fontStyle: "italic",
          },
        },
        "& > h1, & > h2, & > h3, & > h4, & > h5": {
          alignSelf: "center",
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
          display: "block",
          overflow: "scroll",
          borderRadius: 3,
          "& > thead": {
            background: `linear-gradient(to right, ${theme.colors.secondary} 0%, ${theme.colors.secondary} 30%, ${theme.colors.primary} 100%)`,
            color: "#fff",
            textAlign: "left",
            "& > tr > th": {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontWeight: "normal",
              p: 1,
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
          borderRadius: 2,
        },
        "&& > * + *": {
          mt: 2,
        },
        ...css,
      }}
      dangerouslySetInnerHTML={{__html: html}}
      {...props}
    />
  )
}
