import {useSwitchTheme} from "@css-system/gatsby-plugin-css-system"
import MapGL, {
  Filter,
  FullscreenControl,
  LanguageControl,
  Layer,
  NavigationControl,
  Popup,
  ScaleControl,
  Source,
} from "@urbica/react-map-gl"
import {ThemeContext, useCss} from "css-system"
import React, {useContext, useState} from "react"
import {useMemo} from "react"
import {useIntl} from "react-intl"

import {SportTableActivities} from "./sport-table-activities"
import {SportTilesMapLayer} from "./sport-tiles-map-layer"
import {View} from "./view"

export const SportTilesMap = ({
  css,
  activities,
  statsHunters,
  type,
  showActivities = false,
  showTiles = false,
  withControls = false,
}) => {
  const intl = useIntl()
  const theme = useContext(ThemeContext)
  const [themeKey] = useSwitchTheme()
  const [mapLoaded, setMapLoaded] = useState(false)
  const [results, setResults] = useState(null)
  const [viewState, setViewState] = useState({
    zoom: 7,
    longitude: 1.183142,
    latitude: 43.708,
  })

  const mapboxStyle = useMemo(
    () =>
      `xuopled/${
        themeKey === "light"
          ? "ckhj9ux1x2w7x19odqmtxccea"
          : "ckhjauub03fyd19otcjzj5qnw"
      }`,
    [themeKey]
  )

  return (
    <View
      css={{
        flew: 1,
        borderRadius: 2,
        overflow: "hidden",
        width: "100%",
        height: "100%",
        "& .mapboxgl-ctrl-bottom-left": {
          display: "none",
        },
        ...css,
      }}
    >
      <MapGL
        style={{
          width: "100%",
          height: "100%",
        }}
        mapStyle={`mapbox://styles/${mapboxStyle}`}
        accessToken={process.env.GATSBY_MAPBOX_TOKEN}
        latitude={viewState.latitude}
        longitude={viewState.longitude}
        zoom={viewState.zoom}
        onViewportChange={
          withControls ? (viewport) => setViewState(viewport) : null
        }
        attributionControl={false}
        onLoad={() => {
          setMapLoaded(true)
        }}
      >
        <LanguageControl language={intl.locale} />

        {withControls && (
          <>
            <ScaleControl unit="metric" position="bottom-right" />
            <NavigationControl showCompass showZoom position="top-right" />
            <FullscreenControl position="top-right" />
          </>
        )}

        {showTiles && mapLoaded && (
          <>
            <SportTilesMapLayer
              id="square"
              tiles={statsHunters.square}
              color={theme.colors.primary}
            />
            <SportTilesMapLayer
              id="cluster"
              tiles={statsHunters.cluster}
              color={theme.colors.primary}
            />
            <SportTilesMapLayer
              id="tiles"
              tiles={statsHunters.tiles}
              color={theme.colors.secondary}
            />
          </>
        )}
        {showActivities && mapLoaded && (
          <>
            <Source
              id="activites"
              lineMetrics={true}
              type="geojson"
              data={{
                type: "FeatureCollection",
                features: activities.nodes.map((activity) => ({
                  type: "Feature",
                  properties: {
                    activity,
                    type: activity.type.toLowerCase(),
                  },
                  geometry: activity.map.geoJSON,
                })),
              }}
            />
            <Layer
              id="activites"
              onClick={(e) => {
                setResults({
                  coordinates: {
                    latitude: e.lngLat.lat,
                    longitude: e.lngLat.lng,
                  },
                  activities: e.features.map((feature) =>
                    JSON.parse(feature.properties.activity)
                  ),
                  open: false,
                })
              }}
              type="line"
              source="activites"
              layout={{
                "line-join": "round",
                "line-cap": "round",
              }}
              paint={{
                "line-color": theme.colors.secondary,
                "line-width": 3,
                "line-opacity": 0.3,
              }}
            />
            {type !== "all" && (
              <Filter layerId="activites" filter={["==", "type", type]} />
            )}
            <ActivitiesPopup results={results} setResults={setResults} />
          </>
        )}
      </MapGL>
    </View>
  )
}

const ActivitiesPopup = ({results, setResults}) => {
  const className = useCss({
    "&": {
      maxWidth: "unset !important",
      "& > .mapboxgl-popup-content": {
        backgroundColor: "background",
        borderRadius: 3,
        "& > *": {
          color: "text",
          fontSize: "inherit",
        },
        "& > .mapboxgl-popup-close-button": {
          fontSize: 4,
          backgroundColor: "backgroundLight",
          borderRadius: "50%",
          marginTop: -1,
          marginRight: -1,
        },
      },
    },
    [`&.mapboxgl-popup-anchor-top > .mapboxgl-popup-tip,
      &.mapboxgl-popup-anchor-top-right > .mapboxgl-popup-tip,
      &.mapboxgl-popup-anchor-top-left > .mapboxgl-popup-tip`]: {
      borderBottomColor: "background",
    },
    [`&.mapboxgl-popup-anchor-bottom > .mapboxgl-popup-tip,
      &.mapboxgl-popup-anchor-bottom-right > .mapboxgl-popup-tip,
      &.mapboxgl-popup-anchor-bottom-left > .mapboxgl-popup-tip`]: {
      borderTopColor: "background",
    },
    ["&.mapboxgl-popup-anchor-right > .mapboxgl-popup-tip"]: {
      borderLeftColor: "background",
    },
    ["&.mapboxgl-popup-anchor-left > .mapboxgl-popup-tip"]: {
      borderRightColor: "background",
    },
  })

  if (!results) {
    return null
  }

  return (
    <Popup
      className={className}
      longitude={results.coordinates.longitude}
      latitude={results.coordinates.latitude}
      closeButton={true}
      closeOnClick={false}
      onClose={() => setResults(null)}
    >
      <View>
        <SportTableActivities
          activities={results.activities
            .sort((a, b) => b.distance - a.distance)
            .slice(0, 10)}
        />
      </View>
    </Popup>
  )
}
