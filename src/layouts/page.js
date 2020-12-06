import {Helmet} from "react-helmet"
import {ThemeContext} from "css-system"
import {graphql, useStaticQuery} from "gatsby"
import {useTrail} from "react-spring"
import Img from "gatsby-image"
import {useLocation} from "@reach/router"
import React, {useContext, useEffect, useState} from "react"

import {Html} from "../components/html"
import {Icon} from "../components/icon"
import {Link} from "../components/link"
import {Text} from "../components/text"
import {Title} from "../components/title"
import {View} from "../components/view"
import {AnimateContext} from "../utils/animate-context"
import {useSsrLayoutEffect} from "../hooks/use-ssr-layout-effect"

function flattenChildren(children) {
  return React.Children.toArray(children).reduce((flatChildren, child) => {
    if (child.type === React.Fragment) {
      return flatChildren.concat(flattenChildren(child.props.children))
    }
    flatChildren.push(child)
    return flatChildren
  }, [])
}

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
  const {
    site: {
      siteMetadata: {siteUrl},
    },
    siteImage,
  } = useStaticQuery(graphql`
    query LayoutPage {
      site {
        siteMetadata {
          siteUrl
        }
      }
      siteImage: googlePhotosPhoto(description: {eq: "meta-image"}) {
        photo {
          childImageSharp {
            fixed(width: 1024) {
              src
            }
          }
        }
      }
    }
  `)
  const image = cover?.image || siteImage?.photo
  const imageUrl = image?.childImageSharp?.fixed?.src
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
      <Page animated={animated} css={css}>
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
      </Page>
    </>
  )
}

const Page = ({children, animated, css}) => {
  const theme = useContext(ThemeContext)

  /* Animations */
  const childrenArray = flattenChildren(children)
  const animationsCount = animated ? childrenArray.length : 0
  const animations = useTrail(animationsCount, {
    from: {opacity: 0, transform: "translate3d(0, -30px, 0)"},
    to: {opacity: 1, transform: "translate3d(0, 0, 0)"},
  })

  return (
    <View
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
      {React.Children.map(childrenArray, (child, i) =>
        React.cloneElement(child, {
          key: i,
          style: {
            ...(child?.props?.style || {}),
            ...(animations[i] || {}),
          },
        })
      )}
    </View>
  )
}
