import {Paper, PaperIcon, PaperMetadata} from "./paper"
import {
  faCalendar,
  faHourglassStart,
  faRoute,
} from "@fortawesome/pro-light-svg-icons"

import {Flag} from "./flag"
import React from "react"
import {Text} from "./text"
import {Title} from "./title"
import {View} from "./view"
import {graphql} from "gatsby"
import {useMapbox} from "../hooks/use-mapbox"

export const PaperStory = ({
  country,
  flag,
  name,
  relativeDate,
  slug,
  content,
  fields: {polyline},
  ...props
}) => {
  const mapUrl = useMapbox({polyline, width: 320, height: 320})
  return (
    <Paper to={slug} css={{px: 0, pb: 0, gap: 3}} {...props}>
      <Title as="h2" css={{mx: 3}}>
        {name}
      </Title>
      {flag && <Flag country={country} css={{alignSelf: "center"}} />}
      <PaperMetadata
        items={[
          {
            icon: faCalendar,
            label: relativeDate,
          },
          {
            icon: faHourglassStart,
            label: content.timeToRead + " min",
          },
        ]}
      />
      <View css={{position: "relative"}}>
        <PaperIcon
          icon={faRoute}
          css={{
            position: "absolute",
            top: 2,
            right: 2,
          }}
        />
        <View as="img" src={mapUrl} alt={`${country} map`} />
      </View>
    </Paper>
  )
}

export const PaperStoryCompact = ({
  country,
  name,
  relativeDate,
  slug,
  content,
  fields: {polyline},
  ...props
}) => {
  const mapUrl = useMapbox({polyline, width: 130, height: 75})
  return (
    <Paper to={slug} css={{flexDirection: "row", p: 0}} {...props}>
      <View
        as="img"
        src={mapUrl}
        css={{objectFit: "cover", width: "130px", height: "75px"}}
      />
      <View css={{flex: 1, py: 1, px: 2}}>
        <View css={{flexDirection: "row", gap: 1}}>
          <Flag country={country} css={{width: "25px"}} />
          <Text ellipsis>{name}</Text>
        </View>
        <PaperMetadata
          items={[
            {
              icon: faCalendar,
              label: relativeDate,
            },
            {
              icon: faHourglassStart,
              label: content.timeToRead + " min",
            },
          ]}
          css={{p: 0, justifyContent: "start"}}
        />
      </View>
    </Paper>
  )
}

export const query = graphql`
  fragment PaperStoryFragment on GoogleDocs {
    slug
    country
    name
    fields {
      polyline
    }
    relativeDate: date(fromNow: true, locale: $locale)
    content: childMdx {
      timeToRead
    }
  }
`
