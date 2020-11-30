import React, {useEffect, useRef, useState} from "react"
import mapboxgl from "mapbox-gl"

import {View} from "./view"

mapboxgl.accessToken = process.env.GATSBY_MAPBOX_TOKEN

export const Map = () => {
  const [map, setMap] = useState(null)
  const ref = useRef(null)

  useEffect(() => {
    if (ref && !map) {
      const map = new mapboxgl.Map({
        container: ref.current,
        style: "mapbox://styles/mapbox/satellite-v9",
        center: [0, 0],
        zoom: 5,
      })

      map.on("load", () => {
        setMap(map)
        map.resize()
      })
    }
  }, [ref, map])

  return <View ref={ref} />
}
