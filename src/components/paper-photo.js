import {graphql} from "gatsby"
import {GatsbyImage, getImage} from "gatsby-plugin-image"
import React from "react"

import {Paper, PaperIcon} from "./paper"

export const PaperPhoto = ({photo, alt, css, icon, ...props}) => {
  return (
    <Paper
      css={{
        p: 0,
        boxShadow: "none",
        position: "relative",
        ...css,
      }}
      {...props}
    >
      <GatsbyImage image={getImage(photo)} alt={alt} />
      {icon && (
        <PaperIcon
          icon={icon}
          css={{
            position: "absolute",
            top: 2,
            right: 2,
          }}
        />
      )}
    </Paper>
  )
}

export const query = graphql`
  fragment PaperPhotoFragment on GooglePhotosPhoto {
    id
    description
    file {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
      }
    }
  }
`
