import {ThemeContext} from "css-system"
import {graphql, useStaticQuery} from "gatsby"
import {GatsbyImage, getImage} from "gatsby-plugin-image"
import React, {useContext} from "react"

import {View} from "./view"

const CIRCLE_OFFSET = 34

export const Avatar = ({css, ...props}) => {
  const theme = useContext(ThemeContext)
  const data = useStaticQuery(graphql`
    query AvatarQuery {
      avatar: googlePhotosPhoto(
        description: {eq: "Cédric Delpoux sur fond transparent"}
      ) {
        description
        photo {
          childImageSharp {
            gatsbyImageData(width: 200, layout: FIXED)
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
          bottom: `-${CIRCLE_OFFSET}px`,
          left: "50%",
          transform: "translateX(-50%)",
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
      <GatsbyImage image={getImage(data.avatar.photo)} />
      <View
        css={{
          position: "absolute",
          backgroundColor: "background",
          transitionProperty: "background",
          transitionDuration: theme.transition,
          top: "100%",
          height: `${CIRCLE_OFFSET}px`,
          left: "50%",
          transform: "translateX(-50%)",
          width: "66.66%", // 100*2/3
          "&::before": {
            content: '""',
            height: "4px",
            width: "100%",
            position: "absolute",
            top: "-4px",
            transform: "translateX(-50%)",
            left: "50%",
            background: theme.colors.gradient,
          },
        }}
      />
    </View>
  )
}
