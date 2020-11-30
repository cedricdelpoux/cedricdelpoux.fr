import {faCalendar, faImages, faFilm} from "@fortawesome/pro-light-svg-icons"
import {graphql} from "gatsby"
import Img from "gatsby-image"
import React from "react"

import {Flag} from "./flag"
import {Paper, PaperMetadata} from "./paper"
import {Title} from "./title"
import {View} from "./view"

export const PaperCountry = ({name, country, album, videos, ...props}) => (
  <Paper css={{px: 0, gap: 3}} {...props}>
    <Title as="h3" css={{m: 0}}>
      {name}
    </Title>
    {country && <Flag country={country} css={{alignSelf: "center"}} />}
    <PaperMetadata
      items={[
        album && {
          icon: faCalendar,
          label: album.relativeDate,
        },
        {icon: faImages, label: album?.photos?.length || 0},
        {icon: faFilm, label: videos?.length || 0},
      ]}
    />
    {album?.cover && (
      <View
        as={Img}
        fluid={album.cover.photo.childImageSharp.fluid}
        alt={`${country} cover`}
        css={{mb: -3}}
      />
    )}
  </Paper>
)

export const query = graphql`
  fragment PaperCountryFragment on GoogleDocs {
    name
    country
    album {
      relativeDate: latestDate(fromNow: true, locale: $locale)
      cover {
        photo {
          childImageSharp {
            fluid(maxWidth: 500) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      photos {
        id
      }
    }
    videos {
      id
    }
  }
`
