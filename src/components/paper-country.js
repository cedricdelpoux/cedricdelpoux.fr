import {faCalendar, faFilm, faImages} from "@fortawesome/pro-light-svg-icons"
import {graphql} from "gatsby"
import {GatsbyImage, getImage} from "gatsby-plugin-image"
import React from "react"

import {Flag} from "./flag"
import {Paper, PaperMetadata} from "./paper"
import {Text} from "./text"
import {Title} from "./title"
import {View} from "./view"

export const PaperCountry = ({
  name,
  country,
  album,
  videos,
  slug,
  ...props
}) => (
  <Paper to={slug} css={{px: 0, gap: 3}} {...props}>
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
        as={GatsbyImage}
        image={getImage(album.cover.file)}
        alt={`${country} cover`}
        css={{mb: -3}}
      />
    )}
  </Paper>
)

export const PaperCountryCompact = ({
  name,
  country,
  album,
  videos,
  slug,
  ...props
}) => (
  <Paper to={slug} css={{flexDirection: "row", p: 0}} {...props}>
    {album?.cover && (
      <View
        as={GatsbyImage}
        image={getImage(album.cover.file)}
        alt={`${country} cover`}
        css={{height: "75px", width: "130px"}}
      />
    )}
    <View css={{flex: 1, py: 1, px: 2}}>
      <View css={{flexDirection: "row", gap: 1}}>
        <Flag country={country} css={{width: "25px"}} />
        <Text ellipsis>{name}</Text>
      </View>
      <PaperMetadata
        items={[
          album && {
            icon: faCalendar,
            label: album.relativeDate,
          },
          {icon: faImages, label: album?.photos?.length || 0},
          {icon: faFilm, label: videos?.length || 0},
        ]}
        css={{p: 0, justifyContent: "start"}}
      />
    </View>
  </Paper>
)

export const query = graphql`
  fragment PaperCountryFragment on GoogleDocs {
    name
    slug
    country
    album {
      relativeDate: latestDate(fromNow: true, locale: $locale)
      cover {
        file {
          childImageSharp {
            gatsbyImageData(width: 500, placeholder: BLURRED)
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
