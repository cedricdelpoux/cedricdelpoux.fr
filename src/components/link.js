import {Link as GatsbyLink} from "gatsby"
import {OutboundLink} from "gatsby-plugin-google-analytics"
import {extendPrimitive} from "css-system"

import {Text} from "./text"

export const Link = extendPrimitive(Text, ({css, to, ...props}) => {
  return {
    as: to && GatsbyLink,
    css: {
      color: "inherit",
      textDecoration: "none",
      ...css,
    },
    to,
    ...props,
  }
})

export const ExternalLink = extendPrimitive(Text, ({css, ...props}) => {
  return {
    as: OutboundLink,
    css: {
      color: "inherit",
      textDecoration: "none",
      ...css,
    },
    rel: "noopener noreferrer nofollow",
    target: "_blank",
    ...props,
  }
})
