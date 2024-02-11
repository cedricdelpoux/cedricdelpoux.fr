import parse from "date-fns/parse"
import {graphql, useStaticQuery} from "gatsby"
import React, {useMemo} from "react"

import {SportStatsChart} from "./sport-stats-chart"
import {SportStatsTotals} from "./sport-stats-totals"

export const SportStatsYear = ({year}) => {
  const data = useStaticQuery(graphql`
    query SportYearChartQuery {
      allStravaActivity(
        filter: {type: {in: ["Run", "Ride", "VirtualRide"]}}
        sort: {fields: [start_date], order: ASC}
      ) {
        group(field: date_year) {
          year: fieldValue
          total_elevation: sum(field: total_elevation_gain)
          total_time: sum(field: elapsed_time)
          total_distance: sum(field: distance)
          group(field: date_month) {
            month: fieldValue
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
                ...SportTableActivityFragment
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

  const yearData = useMemo(() => {
    return data.allStravaActivity.group.find(
      (yearData) => yearData.year === year
    )
  }, [data, year])

  if (!yearData) return null

  const chartData = useMemo(() => {
    const months = Array.from({length: 12}, (_, i) => i + 1)
    return months.map((month) => {
      return {
        data: yearData?.group.find((group) => group.month == month),
        date: parse(year + "-" + month, "yyyy-MM", new Date()),
      }
    })
  }, [yearData, year])

  return (
    <>
      <SportStatsTotals totals={yearData.totals} />
      <SportStatsChart
        data={chartData}
        xDateOptions={{
          month: "short",
        }}
        tooltipDateOptions={{
          year: "numeric",
          month: "long",
        }}
      />
    </>
  )
}
