import {ThemeContext} from "css-system"
import Img from "gatsby-image"
import mediumZoom from "medium-zoom"
import React, {useRef, useContext, useEffect} from "react"

import {Paper} from "./paper"

export const PaperPhoto = ({photo, alt, ...props}) => {
  const photoRef = useRef()
  const theme = useContext(ThemeContext)

  useEffect(() => {
    mediumZoom(photoRef.current.imageRef.current, {
      margin: theme.space[2],
    })
  }, [photoRef.current])

  return (
    <Paper css={{p: 0}} {...props}>
      <Img ref={photoRef} fluid={photo.childImageSharp.fluid} alt={alt} />
    </Paper>
  )
}
