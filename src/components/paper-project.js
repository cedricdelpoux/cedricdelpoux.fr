import {graphql} from "gatsby"
import Img from "gatsby-image"
import React from "react"

import {Paper} from "./paper"
import {Title} from "./title"
import {View} from "./view"

export const PaperProject = ({
  project: {
    name,
    cover,
    fields: {slug},
  },
  ...props
}) => {
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
          <View as={Img} fluid={cover.image.childImageSharp.fluid} alt={name} />
        </View>
      )}
    </Paper>
  )
}

export const query = graphql`
  fragment PaperProjectFragment on GoogleDocs {
    fields {
      slug
    }
    name
    cover {
      image {
        childImageSharp {
          fluid(maxWidth: 500) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  }
`
