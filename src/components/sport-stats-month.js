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
