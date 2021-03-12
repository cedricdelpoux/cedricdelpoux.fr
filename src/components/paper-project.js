import {graphql} from "gatsby"
import {GatsbyImage, getImage} from "gatsby-plugin-image"
import React from "react"

import {Paper} from "./paper"
import {Title} from "./title"
import {View} from "./view"

export const PaperProject = ({project: {name, cover, slug}, ...props}) => {
  return (
    <Paper to={slug} css={{px: 0, gap: 2}} {...props}>
      <Title as="h2" css={{mx: 3}}>
        {name}
      </Title>
      {cover && cover.image && (
        <View
          height="200px"
          css={{
            position: "relative",
            mt: 2,
            mb: -3,
            background: "rgba(0,0,0,0.2)",
          }}
        >
          <View as={GatsbyImage} image={getImage(cover.image)} alt={name} />
        </View>
      )}
    </Paper>
  )
}

export const query = graphql`
  fragment PaperProjectFragment on GoogleDocs {
    slug
    name
    cover {
      image {
        childImageSharp {
          gatsbyImageData(width: 500, placeholder: BLURRED)
        }
      }
    }
  }
`
