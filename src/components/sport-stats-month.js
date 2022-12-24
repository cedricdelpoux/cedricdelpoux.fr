import {graphql, useStaticQuery} from "gatsby"
import React, {useMemo} from "react"

import {SportStatsMonthChart} from "./sport-stats-month-chart"
import {SportStatsMonthTotals} from "./sport-stats-month-totals"

export const SportStatsMonth = ({month}) => {
  const data = useStaticQuery(graphql`
    query SportMonthChartQuery {
      allStravaActivity(
        filter: {type: {in: ["Run", "Ride"]}, visibility: {eq: "everyone"}}
        sort: {fields: [start_date], order: ASC}
      ) {
        group(field: date_year_month) {
          month: fieldValue
          total_elevation: sum(field: total_elevation_gain)
          total_time: sum(field: elapsed_time)
          total_distance: sum(field: distance)
          group(field: date_day) {
            day: fieldValue
            group(field: type) {
              sport: fieldValue
              elevation: sum(field: total_elevation_gain)
              time: sum(field: elapsed_time)
              distance: sum(field: distance)
              activities: nodes {
                id
                date
                date_day
                type
                moving_time
                distance
                total_elevation_gain
                ...PaperActivityFragment
              }
            }
          }
          totals: group(field: type) {
            sport: fieldValue
            elevation: sum(field: total_elevation_gain)
            time: sum(field: elapsed_time)
            distance: sum(field: distance)
          }
        }
      }
    }
  `)

  const monthData = useMemo(() => {
    return data.allStravaActivity.group.find(
      (monthData) => monthData.month === month
    )
  }, [data, month])

  if (!monthData) return null

  return (
    <>
      <SportStatsMonthTotals totals={monthData.totals} />
      <SportStatsMonthChart month={month} data={monthData} />
    </>
  )
}
