import React, {useCallback, useEffect, useMemo, useState} from "react"

import {LayoutPage} from "../layouts/page"
import {MapPlayControl} from "../components/map-play-control"
import {MapTimeline} from "../components/map-timeline"
import {SportTilesMap} from "../components/sport-tiles-map"
import {getMonthlyTiles} from "../utils/tiles-timeline"
import {graphql} from "gatsby"

const STEP_DURATION_MS = 500

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
  // Every month from the first activity to the last one, the empty ones
  // included, so that the timeline's scale is regular
  const monthly = useMemo(() => getMonthlyTiles(tilesTimeline), [tilesTimeline])
  const yearMonths = useMemo(
    () => monthly.map((month) => month.yearMonth),
    [monthly]
  )

  const lastIndex = Math.max(0, yearMonths.length - 1)
  const [monthIndex, setMonthIndex] = useState(lastIndex)
  const [isPlaying, setIsPlaying] = useState(false)
  const [timelineElement, setTimelineElement] = useState(null)

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(
      () => setMonthIndex((index) => Math.min(index + 1, lastIndex)),
      STEP_DURATION_MS
    )

    return () => clearInterval(interval)
  }, [isPlaying, lastIndex])

  useEffect(() => {
    if (isPlaying && monthIndex >= lastIndex) setIsPlaying(false)
  }, [isPlaying, monthIndex, lastIndex])

  const togglePlaying = () => {
    if (!isPlaying && monthIndex >= lastIndex) setMonthIndex(0)
    setIsPlaying(!isPlaying)
  }

  const handleIndexChange = useCallback((index) => {
    setIsPlaying(false)
    setMonthIndex(index)
  }, [])

  const map = (
    <SportTilesMap
      activities={activities}
      monthly={monthly}
      monthIndex={monthIndex}
      showActivities
      showTiles
      withControls={true}
      fullscreenContainer={timelineElement}
      controls={
        yearMonths.length > 1 && (
          <MapPlayControl isPlaying={isPlaying} onClick={togglePlaying} />
        )
      }
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
          onIndexChange={handleIndexChange}
          containerRef={setTimelineElement}
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
        tiles {
          x
        }
        declutter {
          hidden
          parts
          stubs {
            hideUntil
            showUntil
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
