import {GatsbyImage, getImage} from "gatsby-plugin-image"
import {Paper, PaperIcon} from "./paper"

import React from "react"
import {graphql} from "gatsby"

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
  fragment PaperPhotoFragment on CloudinaryMedia {
    id
    gatsbyImageData(placeholder: BLURRED)
  }
`
