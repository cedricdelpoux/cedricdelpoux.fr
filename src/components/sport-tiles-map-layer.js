import {Layer, Source} from "@urbica/react-map-gl"
import React from "react"

const feature = (coods) => ({
  type: "Feature",
  geometry: {
    type: "Polygon",
    coordinates: [coods],
  },
})

const featureCollection = (tiles) => ({
  type: "FeatureCollection",
  features: tiles.map((tile) => feature(tile)),
})

export const SportTilesMapLayer = ({id, tiles, color}) => (
  <>
    <Source id={id} type="geojson" data={featureCollection(tiles)} />
    <Layer
      id={id}
      type="fill"
      source={id}
      paint={{
        "fill-color": color,
        "fill-opacity": 0.2,
      }}
    />
    <Layer
      id={`${id}_borders`}
      type="line"
      source={id}
      paint={{
        "line-color": color,
        "line-width": 2,
        "line-opacity": 0.2,
      }}
    />
  </>
)
