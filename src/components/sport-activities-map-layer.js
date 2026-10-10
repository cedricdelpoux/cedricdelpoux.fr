import {Layer, Source} from "@urbica/react-map-gl"
import React, {useContext, useMemo} from "react"

import {ThemeContext} from "css-system"
import chroma from "chroma-js"

// The activities as the declutter cut them (see src/utils/declutter.js), as
// in the stravart project: `parts` are solid at every zoom, `stubs` are
// hidden under their `hideUntil` zoom, dashed under their `dashUntil` one and
// solid above.
const activitiesToFeatureCollections = (activities) => {
  const parts = []
  const stubs = []

  activities
    .filter((activity) => activity.declutter && !activity.declutter.hidden)
    .forEach(({id, date_year_month: yearMonth, declutter}) => {
      const properties = {id, yearMonth}

      parts.push({
        type: "Feature",
        properties,
        geometry: {type: "MultiLineString", coordinates: declutter.parts},
      })
      declutter.stubs.forEach(({dashUntil, hideUntil, coordinates}) =>
        stubs.push({
          type: "Feature",
          properties: {...properties, dashUntil, hideUntil},
          geometry: {type: "LineString", coordinates},
        })
      )
    })

  return [
    {type: "FeatureCollection", features: parts},
    {type: "FeatureCollection", features: stubs},
  ]
}

// `zoom` is only allowed as the input of a top level `step`: hence a step per
// whole zoom level, each one comparing the stub's properties to that level
const ZOOM_STEPS = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

const opacityByZoom = (dashed) => {
  const opacityAt = (zoom) => [
    "case",
    [
      "all",
      ["<=", ["get", "hideUntil"], zoom],
      dashed
        ? [">", ["get", "dashUntil"], zoom]
        : ["<=", ["get", "dashUntil"], zoom],
    ],
    1,
    0,
  ]

  return [
    "step",
    ["zoom"],
    opacityAt(ZOOM_STEPS[0] - 1),
    ...ZOOM_STEPS.flatMap((zoom) => [zoom, opacityAt(zoom)]),
  ]
}

const DASHED_OPACITY = opacityByZoom(true)
const SOLID_OPACITY = opacityByZoom(false)

const BEFORE = "departments-border"

// Every activity up to `yearMonth`, the ones of that month in blue over the
// earlier ones in green. The data is only built once: a month only changes
// the filter and the paint, so that the playback never sends the activities
// to the map worker again.
export const SportActivitiesMapLayer = ({
  id,
  activities,
  yearMonth,
  onClick,
}) => {
  const theme = useContext(ThemeContext)

  const [partsData, stubsData] = useMemo(
    () => activitiesToFeatureCollections(activities),
    [activities]
  )

  // Memoized: `Layer` compares each paint, layout and filter property by
  // reference, and a new one is sent to the map worker again
  const {filter, layout, dashedLayout, color} = useMemo(() => {
    const isNew = ["==", ["get", "yearMonth"], yearMonth || ""]
    // The month's activities drawn over the earlier ones
    const sortKey = ["case", isNew, 1, 0]

    return {
      filter: yearMonth ? ["<=", ["get", "yearMonth"], yearMonth] : undefined,
      layout: {
        "line-join": "round",
        "line-cap": "round",
        "line-sort-key": sortKey,
      },
      // Round caps would fill the gaps between the dashes
      dashedLayout: {"line-sort-key": sortKey},
      // A shade darker than the tiles, which are filled with the same colors
      color: [
        "case",
        isNew,
        chroma(theme.colors.primary).darken(1).hex(),
        chroma(theme.colors.secondary).darken(1.2).hex(),
      ],
    }
  }, [yearMonth, theme])

  const solidPaint = useMemo(
    () => ({"line-color": color, "line-width": 1.5}),
    [color]
  )
  const dashedPaint = useMemo(
    () => ({
      "line-color": color,
      "line-width": 1.5,
      "line-dasharray": [3, 3],
      "line-opacity": DASHED_OPACITY,
    }),
    [color]
  )
  const stubsSolidPaint = useMemo(
    () => ({...solidPaint, "line-opacity": SOLID_OPACITY}),
    [solidPaint]
  )

  return (
    <>
      <Source id={id} type="geojson" data={partsData} />
      <Source id={`${id}_stubs`} type="geojson" data={stubsData} />
      <Layer
        id={id}
        type="line"
        source={id}
        filter={filter}
        layout={layout}
        paint={solidPaint}
        before={BEFORE}
      />
      <Layer
        id={`${id}_stubs`}
        type="line"
        source={`${id}_stubs`}
        filter={filter}
        layout={dashedLayout}
        paint={dashedPaint}
        before={BEFORE}
      />
      <Layer
        id={`${id}_stubs_solid`}
        type="line"
        source={`${id}_stubs`}
        filter={filter}
        layout={layout}
        paint={stubsSolidPaint}
        before={BEFORE}
      />
      {/* Invisible and wider than the track: at 1.5 px, aiming at a line is
          close to impossible */}
      <Layer
        id={`${id}_hit`}
        type="line"
        source={id}
        filter={filter}
        paint={HIT_PAINT}
        before={BEFORE}
        onClick={onClick}
      />
    </>
  )
}

const HIT_PAINT = {"line-width": 10, "line-opacity": 0}

// The whole tracks of the selected activities, cuts included, over everything
// else (see the `tracks` written by gatsby-node.js)
export const SportTracksMapLayer = ({id, tracks}) => {
  const theme = useContext(ThemeContext)

  const data = useMemo(
    () => ({
      type: "FeatureCollection",
      features: tracks.map((coordinates) => ({
        type: "Feature",
        properties: {},
        geometry: {type: "LineString", coordinates},
      })),
    }),
    [tracks]
  )
  const paint = useMemo(
    () => ({
      "line-color": chroma(theme.colors.primary).darken(1.5).hex(),
      "line-width": 4,
    }),
    [theme]
  )

  return (
    <>
      <Source id={id} type="geojson" data={data} />
      <Layer
        id={id}
        type="line"
        source={id}
        layout={TRACK_LAYOUT}
        paint={paint}
        before={BEFORE}
      />
    </>
  )
}

const TRACK_LAYOUT = {"line-join": "round", "line-cap": "round"}
