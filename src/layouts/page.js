import {useLocation} from "@reach/router"
import {ThemeContext} from "css-system"
import Img from "gatsby-image"
import React, {useContext, useState} from "react"
import {Helmet} from "react-helmet"
import {useTrail} from "react-spring"

import {Html} from "../components/html"
import {Icon} from "../components/icon"
import {Link} from "../components/link"
import {Text} from "../components/text"
import {Title} from "../components/title"
import {View} from "../components/view"
import {useSiteMetadata} from "../hooks/use-site-metadata"
import {useSsrLayoutEffect} from "../hooks/use-ssr-layout-effect"

export const LayoutPage = ({
  css,
  title,
  description,
  metadata,
  cover,
  html,
  children,
}) => {
  const theme = useContext(ThemeContext)

  // Animations
  const location = useLocation()
  const [animated, setAnimated] = useState(false)
  useSsrLayoutEffect(() => {
    if (location?.state?.previous) {
      setAnimated(true)
    }
  }, [location])

  // Meta
  const {siteUrl} = useSiteMetadata()
  const imageUrl = cover?.image?.childImageSharp?.fixed?.src
  const metaImage = imageUrl && siteUrl + imageUrl

  return (
    <>
      {title && (
        <Helmet>
          <title>{title}</title>
          <meta property="og:title" content={title} />
        </Helmet>
      )}
      {metaImage && (
        <Helmet>
          <meta property="image" content={metaImage} />
          <meta property="og:image" content={metaImage} />
        </Helmet>
      )}
      {description && (
        <Helmet>
          <meta name="description" content={description} />
        </Helmet>
      )}
      <Animated
        animated={animated}
        css={{
          flex: 1,
          maxWidth: theme.breakpoints.m,
          width: "100%",
          mx: "auto",
          px: 2,
          my: 3,
          gap: {_: 2, s: 3},
          ...css,
        }}
      >
        {title && (
          <Title
            as="h1"
            css={{
              mt: 0,
              fontSize: {
                _: 4,
                s: 6,
                m: 7,
              },
              order: "-2",
            }}
          >
            {title}
          </Title>
        )}
        {metadata && (
          <View
            css={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 3,
              gap: 2,
              order: "-1",
            }}
          >
            {metadata.map((item, i) => (
              <View
                key={i}
                css={{flexDirection: "row", alignItems: "center", gap: 1}}
              >
                <Icon
                  icon={item.icon}
                  css={{
                    fontSize: 5,
                  }}
                  gradient
                />
                {item.to ? (
                  <Link to={item.to}>{item.label}</Link>
                ) : (
                  <Text>{item.label}</Text>
                )}
              </View>
            ))}
          </View>
        )}
        {cover && (
          <View css={{position: "relative", mb: 2, p: "2px"}}>
            <View
              css={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                right: 0,
                borderRadius: 3,
                background: theme.colors.gradient,
              }}
            />
            <View
              as={Img}
              fluid={cover.image.childImageSharp.fluid}
              css={{
                borderRadius: 3,
                backgroundColor: "backgroundLight",
              }}
              alt={title}
            />
          </View>
        )}
        {html && <Html html={html} />}
        {children}
      </Animated>
    </>
  )
}

const Animated = ({children, animated, css}) => {
  const childrenArray = React.Children.toArray(children).filter(Boolean)
  const animationsCount = animated ? childrenArray.length : 0
  const animations = useTrail(animationsCount, {
    from: {opacity: 0, transform: "translate3d(0, -30px, 0)"},
    to: {opacity: 1, transform: "translate3d(0, 0, 0)"},
  })

  return (
    <View css={css}>
      {childrenArray.map((child, i) =>
        React.cloneElement(child, {
          style: animations[i],
        })
      )}
    </View>
  )
}
