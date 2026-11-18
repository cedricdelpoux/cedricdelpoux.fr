import {getSrc} from "gatsby-plugin-image"
import React from "react"

import {siteConfig} from "../config/site.js"

export const Seo = ({
  title,
  description,
  cover,
  type = "website",
  locale = "fr",
}) => {
  const coverSrc = cover && getSrc(cover.image)
  const imageUrl = siteConfig.url + (coverSrc || "/meta-image.png")

  return (
    <>
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any" />
      <title>{title || siteConfig.title}</title>
      <meta charSet="utf-8" />
      <meta property="og:site_name" content={siteConfig.title} />
      <meta property="og:locale" content={locale} />
      <meta property="og:type" content={type} />
      <meta property="image" content={imageUrl} />
      <meta property="og:image" content={imageUrl} />
      {title && <meta property="og:title" content={title} />}
      {description && <meta name="description" content={description} />}
    </>
  )
}

export const MdxHead = ({
  data: {
    mdx: {
      excerpt,
      frontmatter: {name},
    },
  },
  pageContext: {locale},
}) => <Seo title={name} description={excerpt} locale={locale} />
