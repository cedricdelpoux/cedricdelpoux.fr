import {faCalendarDay, faHourglassHalf} from "@fortawesome/pro-light-svg-icons"
import {graphql} from "gatsby"
import Img from "gatsby-image"
import React from "react"

import {Paper, PaperMetadata} from "./paper"
import {Title} from "./title"
import {View} from "./view"

export const PaperPost = ({
  post: {
    fields: {slug},
    date,
    name,
    cover,
    childMarkdownRemark: {timeToRead, excerpt},
  },
  ...props
}) => {
  return (
    <Paper to={slug} css={{px: 0}} {...props}>
      <Title as="h2" css={{mx: 3, my: 3}}>
        {name}
      </Title>
      <PaperMetadata
        items={[
          {
            icon: faCalendarDay,
            label: date,
          },
          {icon: faHourglassHalf, label: `${timeToRead} min`},
        ]}
      />
      {cover && cover.image && (
        <View
          height="200px"
          css={{position: "relative", mt: 2, background: "rgba(0,0,0,0.2)"}}
        >
          <View as={Img} fluid={cover.image.childImageSharp.fluid} alt={name} />
        </View>
      )}
      <View css={{mx: 3, mt: 2}}>{excerpt}</View>
    </Paper>
  )
}

export const query = graphql`
  fragment PaperPost on GoogleDocs {
    fields {
      slug
    }
    name
    date(formatString: "Do MMM YYYY", locale: $locale)
    cover {
      image {
        childImageSharp {
          fluid(maxWidth: 500) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
    childMarkdownRemark {
      excerpt
      timeToRead
    }
  }
`
