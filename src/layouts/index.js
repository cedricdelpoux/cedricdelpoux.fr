require("@fortawesome/fontawesome-svg-core/styles.css")

const {Helmet} = require("react-helmet")
const {ThemeContext, useGlobalCss} = require("css-system")
const React = require("react")

const {Blank} = require("./blank")
const {Footer} = require("../components/footer")
const {Header} = require("../components/header")
const {View} = require("../components/view")

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
      borderRadius: 2,
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
    <>
      <Helmet>
        <html lang={pageContext.locale} />
        <meta property="og:locale" content={pageContext.locale} />
        <title>{"Cédric Delpoux"}</title>
        <link rel="icon" href="favicon.svg" type="image/svg+xml" sizes="any" />
        <meta name="robots" content="noindex, nofollow" />
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
        <Header locale={pageContext.locale} />
        {children}
      </View>
      <Footer locale={pageContext.locale} />
    </>
  )
}
