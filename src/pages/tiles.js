import React from "react"
import {SportTilesMap} from "../components/sport-tiles-map"
import {View} from "../components/view"
import {graphql} from "gatsby"
var {useGlobalCss} = require("css-system")

const PageTiles = ({
  data: {
    stravaAthlete: {
      tiles: {parts},
    },
  },
}) => {
  useGlobalCss({
    html: {
      background: "white",
    },
    body: {
      m: 0,
      p: 0,
      fontFamily: "Quicksand",
    },
  })
  return (
    <View css={{position: "relative", height: "100vh", width: "100vw"}}>
      <SportTilesMap
        tiles={{outlines: parts.outlines}}
        useOutlines
        showTiles
        css={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100vh",
          width: "100vw",
        }}
      />
      <View
        css={{
          position: "absolute",
          bottom: 2,
          left: 2,
          background: "white",
          padding: 2,
          borderRadius: 2,
        }}
      >
        <View css={{flexDirection: "column", gap: 1}}>
          <Legend
            color="#ff0000"
            label={`Tiles : ${
              parts.squareSize * parts.squareSize +
              parts.cluster.length +
              parts.rest.length
            }`}
          />
          <Legend
            color="#2ca57e"
            label={`Cluster : ${
              parts.cluster.length + parts.squareSize * parts.squareSize
            }`}
          />
          <Legend
            color="#428cf4"
            label={`Square : ${parts.squareSize}x${parts.squareSize} (${toKm(
              parts.squareSize
            )} km²)`}
          />
        </View>
      </View>
    </View>
  )
}

const toKm = (x) => Math.ceil(x * 1.609344)
function addAlpha(color, opacity) {
  // coerce values so it is between 0 and 1.
  var _opacity = Math.round(Math.min(Math.max(opacity ?? 1, 0), 1) * 255)
  return color + _opacity.toString(16).toUpperCase()
}
const Legend = ({color, label}) => (
  <View css={{flexDirection: "row", alignItems: "center", gap: 1}}>
    <LegendSquare color={color} />
    <span>{label}</span>
  </View>
)
const LegendSquare = ({color}) => (
  <View
    css={{
      background: addAlpha(color, 0.3),
      border: "1px solid " + color,
      width: "16px",
      height: "16px",
    }}
  />
)

export default PageTiles

export const pageQuery = graphql`
  query Tiles {
    stravaAthlete {
      tiles {
        parts {
          squareSize
          cluster {
            x
            y
          }
          rest {
            x
            y
          }
          outlines {
            square
            cluster
            rest
          }
        }
      }
    }
  }
`
