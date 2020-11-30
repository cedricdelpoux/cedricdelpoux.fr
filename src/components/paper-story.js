import {graphql} from "gatsby"
import React from "react"

import {Paper} from "./paper"
import {Title} from "./title"
import {View} from "./view"
import {useMapbox} from "../hooks/use-mapbox"

export const PaperStory = ({fields: {slug}, name, polyline, ...props}) => {
  const mapUrl = useMapbox(polyline)
  return (
    <Paper to={slug} css={{px: 0, pb: 0}} {...props}>
      <Title as="h2" css={{mx: 3, my: 3}}>
        {name}
      </Title>
      <View as="img" src={mapUrl} css={{objectFit: "cover", height: "300px"}} />
    </Paper>
  )
}

export const query = graphql`
  fragment PaperStoryFragment on GoogleDocs {
    fields {
      slug
    }
    name
    polyline
  }
`
