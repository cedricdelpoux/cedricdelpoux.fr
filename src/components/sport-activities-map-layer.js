import {Layer, MapContext, Source} from "@urbica/react-map-gl"
import React, {useContext, useEffect, useMemo} from "react"

import {ThemeContext} from "css-system"
import chroma from "chroma-js"
import {statusAt} from "../utils/tiles-timeline"
import {useMonthFeatureStates} from "../hooks/use-month-feature-states"

// `stubs` are hidden under `hideUntil` and from `showUntil` (0 for never)
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
      declutter.stubs.forEach(({hideUntil, showUntil, coordinates}) =>
        stubs.push({
          type: "Feature",
          properties: {...properties, hideUntil, showUntil},
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
const ZOOM_STEPS = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

const opacityAt = (zoom) => [
  "case",
  [
    "all",
    ["<=", ["get", "hideUntil"], zoom],
    ["any", ["==", ["get", "showUntil"], 0], [">", ["get", "showUntil"], zoom]],
  ],
  1,
  0,
]

const STUBS_OPACITY = [
  "step",
  ["zoom"],
  opacityAt(ZOOM_STEPS[0] - 1),
  ...ZOOM_STEPS.flatMap((zoom) => [zoom, opacityAt(zoom)]),
]

const BEFORE = "departments-border"

const LAYOUT = {"line-join": "round", "line-cap": "round"}

const isStatus = (status) => ["==", ["feature-state", "status"], status]

const isReplaced = ["boolean", ["feature-state", "replaced"], false]

// A width rather than a filter, which would rebuild the tiles at each month
const OLD_WIDTH = ["case", isStatus("old"), 1.5, 0]
const NEW_WIDTH = ["case", ["all", isStatus("new"), ["!", isReplaced]], 1.5, 0]
const HIT_WIDTH = ["case", ["any", isStatus("old"), isStatus("new")], 10, 0]

export const getActivityMonths = (activities, yearMonths) => {
  const indexes = new Map((yearMonths || []).map((ym, index) => [ym, index]))
  const months = new Map()
  const idsByMonth = yearMonths ? yearMonths.map(() => []) : [[]]

  activities.forEach(({id, date_year_month: yearMonth}) => {
    const index = yearMonths
      ? indexes.get(yearMonth) ?? (yearMonth < yearMonths[0] ? 0 : undefined)
      : 0

    if (index === undefined) return

    months.set(id, index)
    idsByMonth[index].push(id)
  })

  return {
    idsByMonth,
    getState: (id, month) => ({status: statusAt(months.get(id), month)}),
  }
}

// In their month, `replacedIds` are drawn whole by `SportNewTracksMapLayer`
export const SportActivitiesMapLayer = ({
  id,
  activities,
  activityMonths,
  monthIndex,
  replacedIds = EMPTY,
  onClick,
}) => {
  const theme = useContext(ThemeContext)
  const map = useContext(MapContext)
  const stubsId = `${id}_stubs`

  const [partsData, stubsData] = useMemo(
    () => activitiesToFeatureCollections(activities),
    [activities]
  )

  useMonthFeatureStates(
    id,
    activityMonths.idsByMonth,
    monthIndex,
    activityMonths.getState
  )
  useMonthFeatureStates(
    stubsId,
    activityMonths.idsByMonth,
    monthIndex,
    activityMonths.getState
  )

  useEffect(() => {
    const setReplaced = (replaced) =>
      [id, stubsId].forEach((source) => {
        if (!map.getSource(source)) return

        replacedIds.forEach((featureId) =>
          map.setFeatureState({source, id: featureId}, {replaced})
        )
      })

    setReplaced(true)

    return () => setReplaced(false)
  }, [map, id, stubsId, replacedIds])

  // A shade darker than the tiles, filled with the same colors
  const paints = useMemo(() => {
    const oldColor = chroma(theme.colors.secondary).darken(1.2).hex()
    const newColor = chroma(theme.colors.primary).darken(1).hex()

    return {
      old: {"line-color": oldColor, "line-width": OLD_WIDTH},
      new: {"line-color": newColor, "line-width": NEW_WIDTH},
      oldStubs: {
        "line-color": oldColor,
        "line-width": OLD_WIDTH,
        "line-opacity": STUBS_OPACITY,
      },
      newStubs: {
        "line-color": newColor,
        "line-width": NEW_WIDTH,
        "line-opacity": STUBS_OPACITY,
      },
    }
  }, [theme])

  return (
    <>
      <Source id={id} type="geojson" data={partsData} promoteId="id" />
      <Source id={stubsId} type="geojson" data={stubsData} promoteId="id" />
      <Layer
        id={id}
        type="line"
        source={id}
        layout={LAYOUT}
        paint={paints.old}
        before={BEFORE}
      />
      <Layer
        id={stubsId}
        type="line"
        source={stubsId}
        layout={LAYOUT}
        paint={paints.oldStubs}
        before={BEFORE}
      />
      <Layer
        id={`${id}_new`}
        type="line"
        source={id}
        layout={LAYOUT}
        paint={paints.new}
        before={BEFORE}
      />
      <Layer
        id={`${stubsId}_new`}
        type="line"
        source={stubsId}
        layout={LAYOUT}
        paint={paints.newStubs}
        before={BEFORE}
      />
      {/* Invisible and wider than the track: at 1.5 px, aiming at a line is
          close to impossible */}
      <Layer
        id={`${id}_hit`}
        type="line"
        source={id}
        paint={ACTIVITIES_HIT_PAINT}
        before={BEFORE}
        onClick={onClick}
      />
    </>
  )
}

const EMPTY = []

const ACTIVITIES_HIT_PAINT = {"line-width": HIT_WIDTH, "line-opacity": 0}

const toFeatureCollection = (tracks) => ({
  type: "FeatureCollection",
  features: tracks.map(({id, coordinates}) => ({
    type: "Feature",
    properties: {id},
    geometry: {type: "LineString", coordinates},
  })),
})

// The whole tracks of the activities bringing new tiles, in their month only
export const SportNewTracksMapLayer = ({
  id,
  tracks,
  activityMonths,
  monthIndex,
  onClick,
}) => {
  const theme = useContext(ThemeContext)

  const data = useMemo(() => toFeatureCollection(tracks), [tracks])
  const paint = useMemo(
    () => ({
      "line-color": chroma(theme.colors.primary).darken(1).hex(),
      "line-width": ["case", isStatus("new"), 1.5, 0],
    }),
    [theme]
  )

  useMonthFeatureStates(
    id,
    activityMonths.idsByMonth,
    monthIndex,
    activityMonths.getState
  )

  return (
    <>
      <Source id={id} type="geojson" data={data} promoteId="id" />
      <Layer
        id={id}
        type="line"
        source={id}
        layout={TRACK_LAYOUT}
        paint={paint}
        before={BEFORE}
      />
      <Layer
        id={`${id}_hit`}
        type="line"
        source={id}
        paint={NEW_TRACKS_HIT_PAINT}
        before={BEFORE}
        onClick={onClick}
      />
    </>
  )
}

const NEW_TRACKS_HIT_PAINT = {
  "line-width": ["case", isStatus("new"), 10, 0],
  "line-opacity": 0,
}

// The whole tracks of the selected activities, cuts included, over everything
// else (see the `tracks` written by gatsby-node.js)
export const SportTracksMapLayer = ({id, tracks}) => {
  const theme = useContext(ThemeContext)

  const data = useMemo(() => toFeatureCollection(tracks), [tracks])
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
