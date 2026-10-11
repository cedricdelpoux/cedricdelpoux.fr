import React, {useContext, useMemo, useState} from "react"

import {LayoutPage} from "../layouts/page"
import {MapTimeline} from "../components/map-timeline"
import {SportTilesMap} from "../components/sport-tiles-map"
import {ThemeContext} from "css-system"
import {getMonthTilesLayers, getMonthlyTiles} from "../utils/tiles-layers"
import {graphql} from "gatsby"

const SportMap = ({
  data: {
    mdx: {
      excerpt,
      frontmatter: {name: title},
    },
    activities,
    stravaAthlete: {tilesTimeline},
  },
  children,
}) => {
  const theme = useContext(ThemeContext)

  // Every month from the first activity to the last one, the empty ones
  // included, so that the timeline's scale is regular
  const monthly = useMemo(() => getMonthlyTiles(tilesTimeline), [tilesTimeline])
  const yearMonths = useMemo(
    () => monthly.map((month) => month.yearMonth),
    [monthly]
  )

  const [monthIndex, setMonthIndex] = useState(
    Math.max(0, yearMonths.length - 1)
  )
  const yearMonth = yearMonths[monthIndex]

  const month = monthly[monthIndex]
  const tilesLayers = useMemo(
    () => getMonthTilesLayers(theme, month, {withActivities: true}),
    [theme, month]
  )

  const map = (
    <SportTilesMap
      activities={activities}
      yearMonth={yearMonth}
      layers={tilesLayers}
      showActivities
      showTiles
      withControls={true}
      initialZoomWidth={1000}
      css={{
        height: {_: "75svh", s: "auto"},
        aspectRatio: {_: "auto", s: "20 / 10"},
      }}
    />
  )

  return (
    <LayoutPage
      title={title}
      // An empty body would stretch between the title and the map
      body={excerpt ? children : null}
      description={excerpt}
      css={{
        maxWidth: "100%",
        mb: 2,
      }}
    >
      {yearMonths.length > 0 ? (
        <MapTimeline
          yearMonths={yearMonths}
          index={monthIndex}
          onIndexChange={setMonthIndex}
        >
          {map}
        </MapTimeline>
      ) : (
        map
      )}
    </LayoutPage>
  )
}

export default SportMap

export const pageQuery = graphql`
  query SportMap($slug: String!) {
    mdx(frontmatter: {slug: {eq: $slug}}) {
      excerpt
      frontmatter {
        name
      }
    }
    activities: allStravaActivity(
      filter: {
        type: {in: ["Run", "Ride", "Hike"]}
        map: {summary_polyline: {ne: null}}
        visibility: {eq: "everyone"}
      }
      sort: {start_date: DESC}
    ) {
      nodes {
        date_year_month
        declutter {
          hidden
          reason
          parts
          stubs {
            dashUntil
            hideUntil
            coordinates
          }
        }
        ...SportTableActivityFragment
      }
    }
    stravaAthlete {
      tilesTimeline {
        yearMonth
        square {
          x
          y
          size
        }
        new {
          x
          y
        }
      }
    }
  }
`
