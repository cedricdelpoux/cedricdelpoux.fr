import React from "react"
import {SportTilesMap} from "../components/sport-tiles-map"
import {graphql} from "gatsby"
var {useGlobalCss} = require("css-system")

const PageTiles = ({data: {statsHunters}}) => {
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
    <SportTilesMap
      statsHunters={statsHunters}
      showTiles
      css={{height: "100vh", width: "100vw"}}
    />
  )
}

export default PageTiles

export const pageQuery = graphql`
  query Tiles {
    statsHunters {
      square
      tiles
      cluster
    }
  }
`
