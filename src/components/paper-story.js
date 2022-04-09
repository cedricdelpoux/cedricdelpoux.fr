import {
  faCalendar,
  faHourglassStart,
  faRoute,
} from "@fortawesome/pro-light-svg-icons"
import {graphql} from "gatsby"
import React from "react"

import {useMapbox} from "../hooks/use-mapbox"
import {Flag} from "./flag"
import {Paper, PaperIcon, PaperMetadata} from "./paper"
import {Title} from "./title"
import {View} from "./view"

export const PaperStory = ({
  country,
  flag,
  name,
  polyline,
  relativeDate,
  slug,
  content,
  ...props
}) => {
  const mapUrl = useMapbox(polyline)
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
        <View
          as="img"
          src={mapUrl}
          css={{objectFit: "cover", height: "300px"}}
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
    polyline
    relativeDate: date(fromNow: true, locale: $locale)
    content: childMdx {
      timeToRead
    }
  }
`
