import {GatsbyImage, getImage} from "gatsby-plugin-image"
import React from "react"

import {Paper} from "./paper"

export const PaperPhoto = ({photo, alt, ...props}) => {
  return (
    <Paper
      css={{
        p: 0,
      }}
      {...props}
    >
      <GatsbyImage image={getImage(photo)} alt={alt} />
    </Paper>
  )
}
