import {FormattedMessage} from "react-intl"
import {graphql} from "gatsby"
import React, {useMemo, useEffect, useState} from "react"

import {LayoutPage} from "../layouts/page"
import {Masonry} from "../components/masonry"
import {PaperActivity} from "../components/paper-activity"
import {SwitcherSport} from "../components/switcher-sport"
import {Title} from "../components/title"
import {View} from "../components/view"
import {
  getMinSpeed,
  getMaxSpeed,
  getMinDistance,
  getMaxDistance,
} from "../utils/activities"
import {
  metersPerSecondTokmPerHour,
  kmPerHourToMetersPerSecond,
  metersToKilometers,
  kilometersToMeters,
} from "../utils/convertors"
import {useLoadMore} from "../hooks/use-load-more"
import InputRange from "../components/input-range"

const COUNT_PER_PAGE = 9

export default ({
  data: {
    googleDocs: {
      name: title,
      childMarkdownRemark: {html, excerpt},
    },
    activities,
  },
}) => {
  const [activitiesCount, setActivitiesCount] = useState(COUNT_PER_PAGE)
  const [filterSport, setFilterSport] = useState("Run")
  const sportActivities = useMemo(
    () =>
      activities.nodes.filter(({activity}) => activity.type === filterSport),
    [activities, filterSport]
  )
  const [minSpeed, setMinSpeed] = useState(getMinSpeed(sportActivities))
  const [maxSpeed, setMaxSpeed] = useState(getMaxSpeed(sportActivities))
  const [minDist, setMinDist] = useState(getMinDistance(sportActivities))
  const [maxDist, setMaxDist] = useState(getMaxDistance(sportActivities))

  const [filterDistance, setFilterDistance] = useState({
    min: metersToKilometers(minDist),
    max: metersToKilometers(maxDist),
  })
  const [filterSpeed, setFilterSpeed] = useState({
    min: metersPerSecondTokmPerHour(minSpeed),
    max: metersPerSecondTokmPerHour(maxSpeed),
  })

  useEffect(() => {
    setMinSpeed(getMinSpeed(sportActivities))
    setMaxSpeed(getMaxSpeed(sportActivities))
    setMinDist(getMinDistance(sportActivities))
    setMaxDist(getMaxDistance(sportActivities))
    setActivitiesCount(COUNT_PER_PAGE)
  }, [sportActivities])

  useEffect(() => {
    setFilterDistance({
      min: metersToKilometers(minDist),
      max: metersToKilometers(maxDist),
    })
  }, [minDist, maxDist])

  useEffect(() => {
    setFilterSpeed({
      min: metersPerSecondTokmPerHour(minSpeed),
      max: metersPerSecondTokmPerHour(maxSpeed),
    })
  }, [minSpeed, maxSpeed])

  const filteredActivities = useMemo(() => {
    setActivitiesCount(COUNT_PER_PAGE)
    return sportActivities.filter(
      ({activity}) =>
        activity.distance >= kilometersToMeters(filterDistance.min) &&
        activity.distance <= kilometersToMeters(filterDistance.max) &&
        activity.average_speed >= kmPerHourToMetersPerSecond(filterSpeed.min) &&
        activity.average_speed <= kmPerHourToMetersPerSecond(filterSpeed.max)
    )
  }, [sportActivities, filterDistance, filterSpeed, filterSport])

  useLoadMore(() => setActivitiesCount(activitiesCount + COUNT_PER_PAGE))

  return (
    <LayoutPage title={title} description={excerpt} html={html}>
      <View
        css={{
          flexDirection: {_: "column", s: "row"},
          alignItems: "center",
          gap: 3,
        }}
      >
        <InputRange
          minValue={Math.floor(metersToKilometers(minDist))}
          maxValue={Math.ceil(metersToKilometers(maxDist))}
          onChange={setFilterDistance}
          unit="km"
        />
        <SwitcherSport
          value={filterSport}
          onChange={() =>
            setFilterSport((oldSport) => (oldSport === "Run" ? "Ride" : "Run"))
          }
        />
        <InputRange
          minValue={Math.floor(metersPerSecondTokmPerHour(minSpeed))}
          maxValue={Math.ceil(metersPerSecondTokmPerHour(maxSpeed))}
          onChange={setFilterSpeed}
          unit="km/h"
        />
      </View>
      <Title as="h2">
        <FormattedMessage
          id="pages.sport.activities.count"
          values={{count: filteredActivities.length}}
        />
      </Title>
      <Masonry animated={false}>
        {filteredActivities.slice(0, activitiesCount).map(({activity}) => (
          <PaperActivity key={activity.id} activity={activity} />
        ))}
      </Masonry>
    </LayoutPage>
  )
}

export const pageQuery = graphql`
  query SportActivities($path: String!) {
    googleDocs(fields: {slug: {eq: $path}}) {
      name
      childMarkdownRemark {
        html
        excerpt
      }
    }
    activities: allStravaActivity(
      filter: {
        activity: {
          type: {in: ["Run", "Ride"]}
          map: {summary_polyline: {ne: null}}
        }
      }
      sort: {fields: [activity___start_date], order: DESC}
    ) {
      nodes {
        ...PaperActivityFragment
      }
    }
  }
`
