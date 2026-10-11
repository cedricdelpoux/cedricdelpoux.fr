import {graphql, useStaticQuery} from "gatsby"
import {useMemo} from "react"

const groupBy = (items, getKey) =>
  items.reduce((groups, item) => {
    const key = getKey(item)

    if (!groups.has(key)) groups.set(key, [])
    groups.get(key).push(item)

    return groups
  }, new Map())

const sumOf = (activities, field) =>
  activities.reduce((sum, activity) => sum + (activity[field] || 0), 0)

export const groupBySport = (activities) =>
  [...groupBy(activities, (activity) => activity.type)].map(
    ([sport, sportActivities]) => ({
      sport,
      distance: sumOf(sportActivities, "distance"),
      time: sumOf(sportActivities, "elapsed_time"),
      elevation: sumOf(sportActivities, "total_elevation_gain"),
      activities: sportActivities,
    })
  )

// Grouped here rather than with nested `group` in the query, which are slow
export const useSportStatsActivities = (filter) => {
  const {
    allStravaActivity: {nodes},
  } = useStaticQuery(graphql`
    query SportStatsQuery {
      allStravaActivity(
        filter: {type: {in: ["Run", "Ride", "VirtualRide"]}}
        sort: {start_date: ASC}
      ) {
        nodes {
          id
          date
          date_year
          date_month
          date_year_month
          date_day
          type
          moving_time
          elapsed_time
          distance
          total_elevation_gain
          ...SportTableActivityFragment
        }
      }
    }
  `)

  return useMemo(() => nodes.filter(filter), [nodes, filter])
}
