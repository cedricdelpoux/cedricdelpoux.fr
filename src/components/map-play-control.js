import React, {useContext, useEffect, useState} from "react"
import {MapContext} from "@urbica/react-map-gl"
import {createPortal} from "react-dom"
import {useIntl} from "react-intl"

const PlayIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" aria-hidden>
    <path d="M3 1.5v10l8.5-5z" fill="#333" />
  </svg>
)

const PauseIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" aria-hidden>
    <path d="M2.5 1.5h3v10h-3zM7.5 1.5h3v10h-3z" fill="#333" />
  </svg>
)

export const MapPlayControl = ({isPlaying, onClick}) => {
  const map = useContext(MapContext)
  const intl = useIntl()
  const [element, setElement] = useState(null)

  useEffect(() => {
    const corner = map?.getContainer().querySelector(".mapboxgl-ctrl-top-right")

    if (!corner) return

    const group = document.createElement("div")

    group.className = "mapboxgl-ctrl mapboxgl-ctrl-group"
    corner.prepend(group)
    setElement(group)

    return () => group.remove()
  }, [map])

  if (!element) return null

  const label = intl.formatMessage({
    id: isPlaying ? "sport.map.pause" : "sport.map.play",
  })

  return createPortal(
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      style={{display: "flex", alignItems: "center", justifyContent: "center"}}
    >
      {isPlaying ? <PauseIcon /> : <PlayIcon />}
    </button>,
    element
  )
}
