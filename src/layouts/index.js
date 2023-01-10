import {MDXProvider} from "@mdx-js/react"
import {ThemeContext, useGlobalCss} from "css-system"
import React from "react"
import {Helmet} from "react-helmet"

import {Avatar} from "../components/avatar"
import {Button} from "../components/button"
import {Footer} from "../components/footer"
import {Header} from "../components/header"
import {Link} from "../components/link"
import {Masonry} from "../components/masonry"
import {SportStatsMonth} from "../components/sport-stats-month"
import {StravaEmbed} from "../components/strava-embed"
import {Technologies} from "../components/technologies"
import {Title} from "../components/title"
import {View} from "../components/view"
import {siteConfig} from "../config/site.js"
import {Blank} from "./blank"

export default ({children, pageContext}) => {
  const theme = React.useContext(ThemeContext)
  useGlobalCss({
    html: {
      scrollBehavior: "smooth",
      background: theme.colors.gradient,
    },
    body: {
      fontFamily: "Quicksand",
      fontWeight: "400",
      lineHeight: "1.8em",
      p: {_: "4px", s: 1, m: 2},
      m: 0,
    },
    "*, *:before, *:after": {
      boxSizing: "border-box",
    },
    a: {
      color: "secondary",
    },
    "input, textarea, button, select, a": {
      "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
    },
    ".medium-zoom-overlay": {
      backgroundColor: `${theme.colors.background} !important`,
    },
    ".medium-zoom-image": {
      outline: "none",
    },
    "::selection": {
      bg: "secondary",
      color: "#fff",
    },
  })

  if (pageContext.layout === "blank") {
    return <Blank>{children}</Blank>
  }

  return (
    <MDXProvider
      components={{
        View,
        Avatar,
        Button,
        Link,
        Grid: Masonry,
        strava: StravaEmbed, // Mdx transform tag to lowercase
        Technologies,
        SportStatsMonth,
        // a: Link,
        h1: (props) => <Title as="h1" {...props} />,
        h2: (props) => <Title as="h2" {...props} />,
        h3: (props) => <Title as="h3" {...props} />,
        h4: (props) => <Title as="h4" {...props} />,
        h5: (props) => <Title as="h5" {...props} />,
      }}
    >
      <Helmet>
        <html lang={pageContext.locale} />
        <link rel="icon" href="favicon.svg" type="image/svg+xml" sizes="any" />
        <title>{siteConfig.title}</title>
        <meta charSet="utf-8" />
        <meta property="og:site_name" content={siteConfig.title} />
        <meta property="og:locale" content={pageContext.locale} />
        <meta property="og:type" content="website" />
      </Helmet>
      <Helmet>
        <meta property="image" content={siteConfig.url + "/meta-image.png"} />
        <meta
          property="og:image"
          content={siteConfig.url + "/meta-image.png"}
        />
      </Helmet>
      <View
        as="svg"
        xmlns="http://www.w3.org/2000/svg"
        css={{position: "fixed", height: 0}}
      >
        <defs>
          <linearGradient id="svg-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={theme.colors.secondary} />
            <stop offset="100%" stopColor={theme.colors.primary} />
          </linearGradient>
          <filter id="svg-shadow" height="130%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
            <feOffset dx="0" dy="0" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.1" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="filter-gradient" primitiveUnits="objectBoundingBox">
            <feImage
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              preserveAspectRatio="none"
              xlinkHref="#svg-gradient"
            />
            <feComposite operator="in" in2="SourceGraphic" />
          </filter>
        </defs>
      </View>
      <View
        css={{
          minHeight: "100vh",
          backgroundColor: "background",
          borderRadius: 3,
          color: "text",
          transitionProperty: "background, color",
          transitionDuration: theme.transition,
        }}
      >
        <Header />
        {children}
      </View>
      <Footer />
    </MDXProvider>
  )
}
