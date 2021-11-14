import {useLocation} from "@reach/router"
import {useTrail} from "@react-spring/web"
import {ThemeContext} from "css-system"
import {GatsbyImage} from "gatsby-plugin-image"
import {getImage, getSrc} from "gatsby-plugin-image"
import React, {useContext, useState} from "react"
import {Helmet} from "react-helmet"

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
  body,
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
  const imageUrl = cover && getSrc(cover.image)
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
        {cover?.image && (
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
              as={GatsbyImage}
              image={getImage(cover.image)}
              css={{
                borderRadius: 3,
                backgroundColor: "backgroundLight",
              }}
              alt={title}
            />
          </View>
        )}
        {body && <Html body={body} />}
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
