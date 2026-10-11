import getDaysInMonth from "date-fns/getDaysInMonth"
import parse from "date-fns/parse"
import React, {useCallback, useMemo} from "react"

import {groupBySport, useSportStatsActivities} from "../hooks/use-sport-stats"
import {SportStatsChart} from "./sport-stats-chart"
import {SportStatsTotals} from "./sport-stats-totals"

export const SportStatsMonth = ({month}) => {
  const activities = useSportStatsActivities(
    useCallback((activity) => activity.date_year_month === month, [month])
  )

  const chartData = useMemo(() => {
    const daysInMonth = getDaysInMonth(new Date(month))
    const days = Array.from({length: daysInMonth}, (_, i) => i + 1)
    const activitiesByDay = days.map((day) =>
      activities.filter((activity) => Number(activity.date_day) === day)
    )

    return days.map((day, index) => ({
      data:
        activitiesByDay[index].length > 0
          ? {group: groupBySport(activitiesByDay[index])}
          : undefined,
      date: parse(month + "-" + day, "yyyy-MM-dd", new Date()),
    }))
  }, [activities, month])
  const totals = useMemo(() => groupBySport(activities), [activities])

  if (activities.length === 0) return null

  return (
    <>
      <SportStatsTotals totals={totals} />
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
