import {Layer, Source} from "@urbica/react-map-gl"
import React, {useMemo} from "react"

import {getTimelineTiles} from "../utils/tiles-timeline"
import {tileToCoords} from "gatsby-strava-tiles/utils/tiles"
import {useMonthFeatureStates} from "../hooks/use-month-feature-states"

const tileToFeature = (tile) => ({
  type: "Feature",
  geometry: {
    type: "Polygon",
    coordinates: [tileToCoords(tile)],
  },
})

const tilesToFeatureCollection = (tiles) => ({
  type: "FeatureCollection",
  features: tiles.map(tileToFeature),
})

// The plugin gives the same area both ways: one square per tile, or the
// border of the whole area as a single outline -- rendering either is just a
// matter of which feature is handed to the map
const outlineToFeature = (outline) => ({
  type: "Feature",
  geometry: {
    type: "MultiPolygon",
    coordinates: outline,
  },
})

export const SportTilesMapLayer = ({
  id,
  tiles,
  outline,
  color,
  fillOpacity = 0.3,
  lineOpacity = 0.3,
  lineWidth = 1,
}) => {
  const data = useMemo(
    () =>
      outline ? outlineToFeature(outline) : tilesToFeatureCollection(tiles),
    [outline, tiles]
  )

  return (
    <>
      <Source id={id} type="geojson" data={data} />
      {fillOpacity > 0 && (
        <Layer
          id={id}
          type="fill"
          source={id}
          paint={{
            "fill-color": color,
            "fill-opacity": fillOpacity,
          }}
          before="departments-border"
        />
      )}
      <Layer
        id={`${id}_borders`}
        type="line"
        source={id}
        paint={{
          "line-color": color,
          "line-width": lineWidth,
          "line-opacity": lineOpacity,
        }}
        before="departments-border"
      />
    </>
  )
}

const byStatus = (status, values, fallback) => [
  "match",
  ["feature-state", "status"],
  ...Object.entries(values).flat(),
  fallback,
]

const squareOutline = (square) => [[tileToCoords(square)]]

// Under the activities, the tiles are filled lighter, so that the tracks
// drawn in the same colors stand out
export const SportTimelineTilesMapLayer = ({
  monthly,
  monthIndex,
  colors,
  withActivities,
}) => {
  const {
    tilesData,
    tileIdsByMonth,
    getTileState,
    edgesData,
    edgeIdsByMonth,
    getEdgeState,
  } = useMemo(() => getTimelineTiles(monthly), [monthly])

  useMonthFeatureStates("tiles", tileIdsByMonth, monthIndex, getTileState)
  useMonthFeatureStates("tiles_edges", edgeIdsByMonth, monthIndex, getEdgeState)

  const tilesPaint = useMemo(
    () => ({
      "fill-color": byStatus("new", {new: colors.new}, colors.old),
      "fill-opacity": byStatus(
        "old",
        withActivities ? {old: 0.15, new: 0.25} : {old: 0.45, new: 0.6},
        0
      ),
    }),
    [colors, withActivities]
  )
  const edgesPaint = useMemo(
    () => ({
      "line-color": byStatus("new", {new: colors.new}, colors.old),
      "line-opacity": byStatus("old", {old: 1, new: 1}, 0),
      "line-width": 1.5,
    }),
    [colors]
  )

  const square = monthly[monthIndex]?.square
  const squareData = useMemo(
    () =>
      square && square.size > 0
        ? outlineToFeature(squareOutline(square))
        : {type: "FeatureCollection", features: []},
    [square]
  )
  const squarePaint = useMemo(
    () => ({"line-color": colors.new, "line-width": 2}),
    [colors]
  )

  return (
    <>
      <Source id="tiles" type="geojson" data={tilesData} />
      <Layer
        id="tiles"
        type="fill"
        source="tiles"
        paint={tilesPaint}
        before="departments-border"
      />
      <Source id="tiles_edges" type="geojson" data={edgesData} />
      <Layer
        id="tiles_edges"
        type="line"
        source="tiles_edges"
        layout={{"line-cap": "square"}}
        paint={edgesPaint}
        before="departments-border"
      />
      <Source id="tiles_square" type="geojson" data={squareData} />
      <Layer
        id="tiles_square"
        type="line"
        source="tiles_square"
        paint={squarePaint}
        before="departments-border"
      />
    </>
  )
}
