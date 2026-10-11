import parse from "date-fns/parse"
import React, {useCallback, useMemo} from "react"

import {groupBySport, useSportStatsActivities} from "../hooks/use-sport-stats"
import {SportStatsChart} from "./sport-stats-chart"
import {SportStatsTotals} from "./sport-stats-totals"

export const SportStatsYear = ({year}) => {
  const activities = useSportStatsActivities(
    useCallback(
      (activity) => String(activity.date_year) === String(year),
      [year]
    )
  )

  const chartData = useMemo(() => {
    const months = Array.from({length: 12}, (_, i) => i + 1)
    const activitiesByMonth = months.map((month) =>
      activities.filter((activity) => Number(activity.date_month) === month)
    )

    return months.map((month, index) => ({
      data:
        activitiesByMonth[index].length > 0
          ? {group: groupBySport(activitiesByMonth[index])}
          : undefined,
      date: parse(year + "-" + month, "yyyy-MM", new Date()),
    }))
  }, [activities, year])
  const totals = useMemo(() => groupBySport(activities), [activities])

  if (activities.length === 0) return null

  return (
    <>
      <SportStatsTotals totals={totals} />
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
