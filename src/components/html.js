import {ThemeContext} from "css-system"
import {MDXRenderer} from "gatsby-plugin-mdx"
import React, {useContext} from "react"

import {View} from "./view"

export const Html = ({body, css, fluid, ...props}) => {
  const theme = useContext(ThemeContext)

  if (!body) return null

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
        "& img, & > [class^=gatsby-resp-image]": {
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
        "& > table": {
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
        },
        "& a": {
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
        "& > ul li": {
          listStyleType: "none",
          "&::before": {
            content: "''",
            display: "inline-block",
            background: theme.colors.gradient,
            height: "8px",
            width: "8px",
            borderRadius: "50%",
            mr: 1,
            mb: "2px",
          },
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
      {...props}
    >
      <MDXRenderer>{body}</MDXRenderer>
    </View>
  )
}
