import {Layer, Source} from "@urbica/react-map-gl"

import React, {useMemo} from "react"
import {tileToCoords} from "gatsby-strava-tiles/utils/tiles"

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
