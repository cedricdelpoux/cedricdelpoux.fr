import {GatsbyImage, getImage} from "gatsby-plugin-image"
import {Paper, PaperMetadata} from "./paper"
import {
  faCalendar,
  faFilm,
  faImages,
  faRoute,
} from "@fortawesome/pro-light-svg-icons"

import {Flag} from "./flag"
import React from "react"
import {Text} from "./text"
import {Title} from "./title"
import {View} from "./view"
import {graphql} from "gatsby"

export const PaperCountry = ({
  name,
  country,
  videos,
  photos,
  fields: {photosCount, relativeDate, polyline},
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
        relativeDate && {
          icon: faCalendar,
          label: relativeDate,
        },
        polyline && {icon: faRoute, label: 1},
        {icon: faImages, label: photosCount},
        {icon: faFilm, label: videos?.length || 0},
      ]}
    />
    {photos?.length > 0 && (
      <View
        as={GatsbyImage}
        image={getImage(photos[0])}
        alt={`${country} cover`}
        css={{mb: -3}}
      />
    )}
  </Paper>
)

export const PaperCountryCompact = ({
  name,
  country,
  photos,
  fields: {photosCount, relativeDate},
  videos,
  slug,
  ...props
}) => (
  <Paper to={slug} css={{flexDirection: "row", p: 0}} {...props}>
    {photos?.length > 0 && (
      <View
        as={GatsbyImage}
        image={getImage(photos[0])}
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
          relativeDate && {
            icon: faCalendar,
            label: relativeDate,
          },
          {icon: faImages, label: photosCount || 0},
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
    videos {
      id
    }
    fields {
      photosCount
      relativeDate: lastVisitDate(fromNow: true, locale: $locale)
      polyline
    }
    photos {
      gatsbyImageData(width: 500, placeholder: BLURRED)
      id
    }
  }
`
