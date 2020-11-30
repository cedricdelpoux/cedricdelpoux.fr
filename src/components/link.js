import {Link as GatsbyLink} from "gatsby"
import {OutboundLink} from "gatsby-plugin-google-analytics"
import {extendPrimitive} from "css-system"

import {Text} from "./text"

const relativesExceptions = ["/rss.xml", "/sitemap.xml"]

export const Link = extendPrimitive(Text, ({css, to, ...props}) => {
  const relative = to.startsWith("/") && !relativesExceptions.includes(to)
  const as = relative ? GatsbyLink : OutboundLink
  const linkProps = relative
    ? {
        to,
      }
    : {
        href: to,
        rel: "noopener noreferrer nofollow",
        target: "_blank",
      }
  return {
    as,
    css: {
      color: "inherit",
      textDecoration: "none",
      ...css,
    },
    ...linkProps,
    ...props,
  }
})
