import {graphql} from "gatsby"
import {GatsbyImage, getImage} from "gatsby-plugin-image"
import React from "react"

import {Paper} from "./paper"

export const PaperPhoto = ({photo, alt, css, ...props}) => {
  return (
    <Paper
      css={{
        p: 0,
        boxShadow: "none",
        ...css,
      }}
      {...props}
    >
      <GatsbyImage image={getImage(photo)} alt={alt} />
    </Paper>
  )
}

export const query = graphql`
  fragment PaperPhotoFragment on GooglePhotosPhoto {
    id
    file {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
      }
    }
  }
`
