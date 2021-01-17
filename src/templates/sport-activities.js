import {graphql} from "gatsby"
import React, {useLayoutEffect, useMemo, useState} from "react"
import {FormattedMessage} from "react-intl"

import {Grid} from "../components/grid"
import InputRange from "../components/input-range"
import {PaperActivity} from "../components/paper-activity"
import {SwitcherSport} from "../components/switcher-sport"
import {Title} from "../components/title"
import {View} from "../components/view"
import {useLoadMore} from "../hooks/use-load-more"
import {LayoutPage} from "../layouts/page"
import {
  getMaxDistance,
  getMaxSpeed,
  getMinDistance,
  getMinSpeed,
} from "../utils/activities"
import {
  kilometersToMeters,
  kmPerHourToMetersPerSecond,
} from "../utils/convertors"

const COUNT_PER_PAGE = 9

export default ({
  data: {
    googleDocs: {
      name: title,
      childMdx: {body, excerpt},
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

  const minSpeed = useMemo(() => getMinSpeed(sportActivities), [
    sportActivities,
  ])
  const maxSpeed = useMemo(() => getMaxSpeed(sportActivities), [
    sportActivities,
  ])
  const minDist = useMemo(() => getMinDistance(sportActivities), [
    sportActivities,
  ])
  const maxDist = useMemo(() => getMaxDistance(sportActivities), [
    sportActivities,
  ])

  const [filterDistance, setFilterDistance] = useState({
    min: minDist,
    max: maxDist,
  })

  const [filterSpeed, setFilterSpeed] = useState({
    min: minSpeed,
    max: maxSpeed,
  })

  useLayoutEffect(() => {
    setFilterDistance({
      min: minDist,
      max: maxDist,
    })
  }, [minDist, maxDist])

  useLayoutEffect(() => {
    setFilterSpeed({
      min: minSpeed,
      max: maxSpeed,
    })
  }, [minSpeed, maxSpeed])

  useLoadMore(() => setActivitiesCount(activitiesCount + COUNT_PER_PAGE))

  const filteredActivities = useMemo(() => {
    return sportActivities.filter(
      ({activity}) =>
        activity.distance >= kilometersToMeters(filterDistance.min) &&
        activity.distance <= kilometersToMeters(filterDistance.max) &&
        activity.average_speed >= kmPerHourToMetersPerSecond(filterSpeed.min) &&
        activity.average_speed <= kmPerHourToMetersPerSecond(filterSpeed.max)
    )
  }, [sportActivities, filterDistance, filterSpeed, filterSport])

  return (
    <LayoutPage title={title} description={excerpt} body={body}>
      <View
        css={{
          flexDirection: {_: "column", s: "row"},
          alignItems: "center",
          gap: 3,
        }}
      >
        <InputRange
          minValue={minDist}
          maxValue={maxDist}
          onChange={setFilterDistance}
          unit="km"
        />
        <SwitcherSport
          value={filterSport}
          onChange={() => {
            setActivitiesCount(COUNT_PER_PAGE)
            setFilterSport((oldSport) => (oldSport === "Run" ? "Ride" : "Run"))
          }}
        />
        <InputRange
          minValue={minSpeed}
          maxValue={maxSpeed}
          onChange={setFilterSpeed}
          unit="km/h"
        />
      </View>
      <Title as="h2">
        <FormattedMessage
          id="sport.activities.count"
          values={{count: filteredActivities.length}}
        />
      </Title>
      <Grid>
        {filteredActivities.slice(0, activitiesCount).map(({activity}) => (
          <PaperActivity key={activity.id} activity={activity} />
        ))}
      </Grid>
    </LayoutPage>
  )
}

export const pageQuery = graphql`
  query SportActivities($path: String!) {
    googleDocs(slug: {eq: $path}) {
      name
      childMdx {
        body
        excerpt
      }
    }
    activities: allStravaActivity(
      filter: {
        activity: {
          type: {in: ["Run", "Ride"]}
          map: {summary_polyline: {ne: null}}
          visibility: {eq: "everyone"}
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
