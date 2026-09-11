import getDaysInMonth from "date-fns/getDaysInMonth"
import parse from "date-fns/parse"
import {graphql, useStaticQuery} from "gatsby"
import React, {useMemo} from "react"

import {SportStatsChart} from "./sport-stats-chart"
import {SportStatsTotals} from "./sport-stats-totals"

export const SportStatsMonth = ({month}) => {
  const data = useStaticQuery(graphql`
    query SportMonthChartQuery {
      allStravaActivity(
        filter: {type: {in: ["Run", "Ride", "VirtualRide"]}}
        sort: {start_date: ASC}
      ) {
        group(field: {date_year_month: SELECT}) {
          month: fieldValue
          total_elevation: sum(field: {total_elevation_gain: SELECT})
          total_time: sum(field: {elapsed_time: SELECT})
          total_distance: sum(field: {distance: SELECT})
          group(field: {date_day: SELECT}) {
            day: fieldValue
            group(field: {type: SELECT}) {
              sport: fieldValue
              elevation: sum(field: {total_elevation_gain: SELECT})
              time: sum(field: {elapsed_time: SELECT})
              distance: sum(field: {distance: SELECT})
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
          totals: group(field: {type: SELECT}) {
            sport: fieldValue
            elevation: sum(field: {total_elevation_gain: SELECT})
            time: sum(field: {elapsed_time: SELECT})
            distance: sum(field: {distance: SELECT})
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

  const chartData = useMemo(() => {
    const daysInMonth = getDaysInMonth(new Date(month))
    const days = Array.from({length: daysInMonth}, (_, i) => i + 1)
    return days.map((day) => {
      return {
        data: monthData?.group.find((group) => group.day == day),
        date: parse(month + "-" + day, "yyyy-MM-dd", new Date()),
      }
    })
  }, [monthData, month])

  return (
    <>
      <SportStatsTotals totals={monthData.totals} />
      <SportStatsChart
        data={chartData}
        xDateOptions={{
          day: "numeric",
        }}
        tooltipDateOptions={{
          day: "numeric",
          year: "numeric",
          month: "long",
        }}
      />
    </>
  )
}
