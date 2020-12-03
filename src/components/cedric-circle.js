import {ThemeContext} from "css-system"
import {graphql, useStaticQuery} from "gatsby"
import Img from "gatsby-image"
import React, {useContext} from "react"

import {View} from "./view"

export const CedricCircle = ({css, ...props}) => {
  const theme = useContext(ThemeContext)
  const data = useStaticQuery(graphql`
    query CedricCircleQuery {
      avatar: googlePhotosPhoto(
        description: {eq: "Cédric Delpoux sur fond transparent"}
      ) {
        description
        photo {
          childImageSharp {
            fixed(width: 200) {
              ...GatsbyImageSharpFixed_withWebp
            }
          }
        }
      }
    }
  `)
  return (
    <View
      css={{
        width: 260,
        position: "relative",
        alignItems: "center",
        ...css,
      }}
      {...props}
    >
      <View
        css={{
          position: "absolute",
          background: theme.colors.gradient,
          borderRadius: "50%",
          width: "100%",
          paddingBottom: "100%",
          bottom: "-34px",
          left: "50%",
          transform: "translateX(-50%)",
          boxShadow: theme.boxShadow,
          transitionDuration: theme.transition,
          transitionProperty: "box-shadow",
        }}
      />
      <View
        css={{
          position: "absolute",
          backgroundColor: "backgroundLight",
          borderRadius: "50%",
          width: "calc(100% - 8px)",
          paddingBottom: "calc(100% - 8px)",
          bottom: "-30px",
          left: "50%",
          transform: "translateX(-50%)",
          transitionDuration: theme.transition,
          transitionProperty: "background",
        }}
      />
      <Img fixed={data.avatar.photo.childImageSharp.fixed} />
      <View
        css={{
          position: "absolute",
          backgroundColor: "background",
          transitionProperty: "background",
          transitionDuration: theme.transition,
          top: "100%",
          height: "50px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
        }}
      />
    </View>
  )
}
