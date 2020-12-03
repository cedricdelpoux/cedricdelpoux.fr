import {ThemeContext} from "css-system"
import {graphql} from "gatsby"
import Loadable from "@loadable/component"
import React, {useContext, useState} from "react"
import startOfWeek from "date-fns/startOfWeek"
import subWeeks from "date-fns/subWeeks"

import {Masonry} from "./masonry"
import {PaperActivity} from "./paper-activity"
import {Sidebar} from "./sidebar"
import {View} from "./view"
import {generateColorsRange, getColorFromRange} from "../utils/colors"
import {metersToKilometers} from "../utils/convertors"

const CalendarHeatmap = Loadable(() => import("react-calendar-heatmap"))

const weeksCount = 42
const endDate = new Date()
const startDate = startOfWeek(subWeeks(endDate, weeksCount))

export const Heatmap = ({activities, css, calendarHeatmapProps, ...props}) => {
  const theme = useContext(ThemeContext)
  const [activeDay, setActiveDay] = useState(null)
  const activitiesByDate = activities
    .filter(({activity}) => new Date(activity.start_date) > startDate)
    .reduce((acc, {activity}) => {
      const date = activity.start_date.slice(0, 10)
      if (!acc[date]) {
        acc[date] = {
          date,
          distance: 0,
          activities: [],
        }
      }

      acc[date].distance += activity.distance
      acc[date].activities.push(activity)

      return acc
    }, {})
  const distanceMaxForOneDay =
    Object.values(activitiesByDate).length > 0
      ? Math.max(...Object.values(activitiesByDate).map((d) => d.distance))
      : 0

  const colorsRange = generateColorsRange({
    colors: [
      theme.colors.backgroundLight,
      theme.colors.secondary,
      theme.colors.primary,
    ],
    min: 0,
    max: distanceMaxForOneDay,
  })
  return (
    <View
      css={{
        "& > .react-calendar-heatmap": {
          overflow: "visible",
          "& > .react-calendar-heatmap-month-labels": {
            fill: "currentColor",
            fontSize: 1,
          },
          "& > .react-calendar-heatmap-all-weeks": {
            filter: "url(#svg-shadow)",
            "& > .react-calendar-heatmap-week": {
              "& > .color-filled, & > .color-empty": {
                transitionProperty: "fill",
                transitionDuration: theme.transition,
              },
            },
          },
        },
        ...css,
      }}
      {...props}
    >
      <CalendarHeatmap
        horizontal={true}
        startDate={startDate}
        endDate={endDate}
        values={Object.values(activitiesByDate)}
        gutterSize={2}
        showWeekdayLabels={false}
        showMonthLabels={false}
        titleForValue={(value) =>
          value && value.date
            ? `${value.date.slice(0, 10)}: ${metersToKilometers(
                value.distance
              )}km`
            : ""
        }
        tooltipDataAttrs={(value) => ({
          "data-tip":
            value && value.date
              ? `${value.date.slice(0, 10)}: ${metersToKilometers(
                  value.distance
                )}km`
              : "",
        })}
        onClick={(value) => value && setActiveDay(value)}
        transformDayElement={(element, value) => {
          const distance = value ? value.distance : 0
          return React.cloneElement(element, {
            style: {
              fill: getColorFromRange(colorsRange, distance),
            },
          })
        }}
        {...calendarHeatmapProps}
      />
      <Sidebar
        isOpen={activeDay ? true : false}
        onClose={() => setActiveDay(null)}
        css={{width: {_: "100vw !important", m: "75vw !important"}}}
      >
        <Masonry>
          {activeDay &&
            activeDay.activities.map((activity) => (
              <PaperActivity key={activity.id} activity={activity} />
            ))}
        </Masonry>
      </Sidebar>
    </View>
  )
}

export const query = graphql`
  fragment ActivityHeatmapFragment on StravaActivity {
    activity {
      id
      name
      type
      start_date
      distance
    }
  }
`
