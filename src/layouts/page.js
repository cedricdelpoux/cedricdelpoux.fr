import {Helmet} from "react-helmet"
import {ThemeContext} from "css-system"
import {graphql, useStaticQuery} from "gatsby"
import {useTrail} from "react-spring"
import Img from "gatsby-image"
import React, {useContext} from "react"

import {Html} from "../components/html"
import {Icon} from "../components/icon"
import {Link} from "../components/link"
import {Text} from "../components/text"
import {Title} from "../components/title"
import {View} from "../components/view"

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
  const childrenArray = flattenChildren(children)

  /* Animations */
  // const animationTitle = title ? 1 : 0
  // const animationMetadata = metadata ? 1 : 0
  // const animationCover = cover ? 1 : 0
  // const animationHtml = html ? 1 : 0
  // const animationsCount =
  //   childrenArray.length +
  //   animationTitle +
  //   animationMetadata +
  //   animationCover +
  //   animationHtml
  const animationsCount = 0
  const animations = useTrail(animationsCount, {
    from: {opacity: 0, transform: "translate3d(0, -30px, 0)"},
    to: {opacity: 1, transform: "translate3d(0, 0, 0)"},
  })

  /* Meta */
  const {
    site: {siteMetadata},
    profilePhoto: {photo: metaLayoutImage},
  } = useStaticQuery(graphql`
    query LayoutPageQuery {
      site {
        siteMetadata {
          siteUrl
          title
        }
      }
      profilePhoto: googlePhotosPhoto(description: {eq: "Cédric Delpoux"}) {
        photo {
          childImageSharp {
            fixed(width: 341) {
              src
            }
          }
        }
      }
    }
  `)
  
  const coverImage = cover?.image || metaLayoutImage
  const metaImage = siteMetadata.siteUrl + coverImage.childImageSharp.fixed.src
  const metaTitle = title || siteMetadata.title
  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta property="image" content={metaImage} />
        <meta property="og:image" content={metaImage} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:site_name" content={siteMetadata.title} />
        <meta name="description" content={description || ""} />
      </Helmet>
      <View
        css={{
          flex: 1,
          maxWidth: theme.breakpoints.m,
          width: "100%",
          mx: "auto",
          px: 2,
          my: 3,
          gap: {_: 2, m: 3},
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
            style={animations.shift()}
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
            style={animations.shift()}
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
          <View css={{position: "relative", mb: 2}} style={animations.shift()}>
            <View
              css={{
                position: "absolute",
                left: -2,
                top: 2,
                borderRadius: 3,
                height: "100%",
                width: "100%",
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
              alt={metaTitle}
            />
          </View>
        )}
        {html && <Html html={html} style={animations.shift()} />}
        {React.Children.map(childrenArray, (child, i) =>
          React.cloneElement(child, {
            key: i,
            style: {
              ...child.props.style,
              ...animations[i],
            },
          })
        )}
      </View>
    </>
  )
}
