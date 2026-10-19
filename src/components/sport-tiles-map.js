import MapGL, {
  FullscreenControl,
  LanguageControl,
  NavigationControl,
  Popup,
  ScaleControl,
} from "@urbica/react-map-gl"
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import {latToY, lngToX} from "gatsby-strava-tiles/utils/map"
import polyline from "@mapbox/polyline"

import {
  SportActivitiesMapLayer,
  SportNewTracksMapLayer,
  SportTracksMapLayer,
  getActivityMonths,
} from "./sport-activities-map-layer"
import {
  SportTilesMapLayer,
  SportTimelineTilesMapLayer,
} from "./sport-tiles-map-layer"
import {SportTableActivities} from "./sport-table-activities"
import {Button} from "./button"
import {Text} from "./text"
import {View} from "./view"
import {useSsrLayoutEffect} from "../hooks/use-ssr-layout-effect"
import {withPrefix} from "gatsby"
import {ThemeContext, useCss} from "css-system"
import {FormattedMessage, useIntl} from "react-intl"

const EMPTY = []

// Loaded once and shared by every map, each track decoded once
let tracksFile = null
const loadTracks = () =>
  tracksFile ||
  (tracksFile = fetch(withPrefix("/tracks.json"))
    .then((response) => response.json())
    .catch((error) => {
      tracksFile = null
      throw error
    }))

const decodedTracks = new Map()
const decodeTrack = (encodedTracks, id) => {
  if (!decodedTracks.has(id)) {
    decodedTracks.set(
      id,
      encodedTracks[id] && {
        id,
        coordinates: polyline
          .decode(encodedTracks[id])
          .map(([lat, lng]) => [lng, lat]),
      }
    )
  }

  return decodedTracks.get(id)
}

const useEncodedTracks = (enabled) => {
  const [encodedTracks, setEncodedTracks] = useState(null)

  useEffect(() => {
    if (!enabled) return

    let isCurrent = true

    loadTracks()
      .then((loaded) => isCurrent && setEncodedTracks(loaded))
      .catch(() => {})

    return () => {
      isCurrent = false
    }
  }, [enabled])

  return encodedTracks
}

const useTracks = (encodedTracks, ids) =>
  useMemo(
    () =>
      encodedTracks
        ? ids.map((id) => decodeTrack(encodedTracks, id)).filter(Boolean)
        : EMPTY,
    [encodedTracks, ids]
  )

// The ids of the activities going through each tile, hidden ones included,
// loaded on the first right click (see gatsby-node.js)
const useTileActivityIds = (tile) => {
  const index = useRef(null)
  const [ids, setIds] = useState(null)

  useEffect(() => {
    if (!tile) return

    const key = `${tile.x}-${tile.y}`

    if (index.current) {
      setIds(index.current[key] || EMPTY)
      return
    }

    let isCurrent = true
    setIds(null)
    fetch(withPrefix("/tile-activities.json"))
      .then((response) => response.json())
      .then((loaded) => {
        index.current = loaded
        if (isCurrent) setIds(loaded[key] || EMPTY)
      })
      .catch(() => isCurrent && setIds(EMPTY))

    return () => {
      isCurrent = false
    }
  }, [tile])

  return ids
}

export const SportTilesMap = ({
  css,
  activities,
  tiles,
  useOutlines = false,
  // From `getMonthlyTiles`, in place of `tiles`
  monthly,
  monthIndex,
  showActivities = false,
  showTiles = false,
  withControls = false,
  initialZoom = 7.3,
  // A narrower map zooms out to show the same area as at this width
  initialZoomWidth,
  controls,
  fullscreenContainer,
}) => {
  const intl = useIntl()
  const theme = useContext(ThemeContext)
  const [mapLoaded, setMapLoaded] = useState(false)
  // A left click on a track lists the activities under it, a right click
  // anywhere lists the ones going through that tile, hidden ones included.
  // Either way, the whole tracks of the listed activities are drawn.
  const [results, setResults] = useState(null)
  const [selectedTile, setSelectedTile] = useState(null)
  const [tileSelectedIds, setTileSelectedIds] = useState(EMPTY)
  const [isShowingAll, setIsShowingAll] = useState(false)

  const yearMonth = monthly?.[monthIndex]?.yearMonth
  const yearMonths = useMemo(
    () => monthly?.map((month) => month.yearMonth),
    [monthly]
  )
  const activityMonths = useMemo(
    () => getActivityMonths(activities?.nodes || EMPTY, yearMonths),
    [activities, yearMonths]
  )
  // Without a timeline, every activity is an old one
  const activitiesMonthIndex = monthly ? monthIndex : 1

  // The popup looks the clicked activities up from the ids of the features
  const activitiesById = useMemo(
    () =>
      new Map(
        (activities?.nodes || []).map((activity) => [activity.id, activity])
      ),
    [activities]
  )

  const tileActivityIds = useTileActivityIds(selectedTile)
  // In the order of `activities`, and only up to the month the map shows
  const tileActivities = useMemo(() => {
    if (!tileActivityIds) return null

    const ids = new Set(tileActivityIds)

    return (activities?.nodes || []).filter(
      (activity) =>
        ids.has(activity.id) &&
        (!yearMonth || activity.date_year_month <= yearMonth)
    )
  }, [tileActivityIds, activities, yearMonth])
  const hiddenIds = useMemo(
    () =>
      new Set(
        (tileActivities || EMPTY)
          .filter((activity) => activity.declutter?.hidden)
          .map((activity) => activity.id)
      ),
    [tileActivities]
  )

  const trackIds = useMemo(() => {
    if (selectedTile) {
      return isShowingAll
        ? (tileActivities || EMPTY).map((activity) => activity.id)
        : tileSelectedIds
    }

    return results ? results.activities.map((activity) => activity.id) : EMPTY
  }, [selectedTile, isShowingAll, tileActivities, tileSelectedIds, results])
  const encodedTracks = useEncodedTracks(showActivities)
  const tracks = useTracks(encodedTracks, trackIds)

  // The declutter may have cut them down to nothing, and the month's new
  // tiles would then show no track
  const newIds = useMemo(
    () =>
      monthly
        ? (activities?.nodes || [])
            .filter(
              (activity) => activity.declutter && activity.tiles?.length > 0
            )
            .map((activity) => activity.id)
        : EMPTY,
    [activities, monthly]
  )
  const newTracks = useTracks(encodedTracks, newIds)
  // Until they are loaded, the decluttered ones stay drawn
  const newTrackIds = useMemo(
    () => newTracks.map((track) => track.id),
    [newTracks]
  )

  // The click handler of a layer is the one it was added with
  const yearMonthRef = useRef(yearMonth)
  yearMonthRef.current = yearMonth

  const handleActivitiesClick = useCallback(
    (e) => {
      setSelectedTile(null)
      setResults({
        coordinates: {
          latitude: e.lngLat.lat,
          longitude: e.lngLat.lng,
        },
        activities: [
          ...new Set(e.features.map(({properties}) => properties.id)),
        ]
          .map((id) => activitiesById.get(id))
          .filter(
            (activity) =>
              activity &&
              (!yearMonthRef.current ||
                activity.date_year_month <= yearMonthRef.current)
          )
          .sort((a, b) => b.distance - a.distance)
          .slice(0, 10),
      })
    },
    [activitiesById]
  )
  const handleContextMenu = useCallback((e) => {
    e.originalEvent.preventDefault()
    setResults(null)
    setTileSelectedIds(EMPTY)
    setIsShowingAll(false)
    setSelectedTile({
      x: lngToX(e.lngLat.lng),
      y: latToY(e.lngLat.lat),
      lngLat: e.lngLat,
    })
  }, [])
  const toggleTileActivity = useCallback((id) => {
    setIsShowingAll(false)
    setTileSelectedIds((ids) =>
      ids.includes(id) ? ids.filter((other) => other !== id) : [...ids, id]
    )
  }, [])
  const tilesColors = useMemo(
    () => ({old: theme.colors.secondary, new: theme.colors.primary}),
    [theme]
  )
  const selectedTileTiles = useMemo(
    () => (selectedTile ? [selectedTile] : EMPTY),
    [selectedTile]
  )

  const [viewState, setViewState] = useState({
    zoom: initialZoom,
    longitude: 1.343,
    latitude: 43.711,
  })

  const containerRef = useRef(null)
  useSsrLayoutEffect(() => {
    const width = containerRef.current?.offsetWidth
    if (!initialZoomWidth || !width || width >= initialZoomWidth) return

    setViewState((state) => ({
      ...state,
      zoom: initialZoom + Math.log2(width / initialZoomWidth),
    }))
  }, [initialZoom, initialZoomWidth])

  return (
    <View
      ref={containerRef}
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
        mapStyle="mapbox://styles/xuopled/cmlopmwg2009x01skbjqg7urz"
        accessToken={process.env.GATSBY_MAPBOX_TOKEN}
        latitude={viewState.latitude}
        longitude={viewState.longitude}
        zoom={viewState.zoom}
        onViewportChange={
          withControls
            ? (viewport) => {
                setViewState(viewport)
              }
            : null
        }
        attributionControl={false}
        onLoad={() => setMapLoaded(true)}
        onContextmenu={showActivities ? handleContextMenu : undefined}
      >
        <LanguageControl language={intl.locale} />

        {withControls && (
          <>
            <ScaleControl unit="metric" position="bottom-right" />
            <NavigationControl showCompass showZoom position="top-right" />
            {/* The container is only read when the control is created */}
            <FullscreenControl
              key={fullscreenContainer ? "container" : "map"}
              container={fullscreenContainer}
              position="top-right"
            />
          </>
        )}
        {mapLoaded && controls}

        {showTiles && mapLoaded && monthly && (
          <SportTimelineTilesMapLayer
            monthly={monthly}
            monthIndex={monthIndex}
            colors={tilesColors}
            withActivities={showActivities}
          />
        )}
        {showTiles && mapLoaded && !monthly && (
          <>
            <SportTilesMapLayer
              id="square"
              tiles={tiles.square}
              outline={useOutlines ? tiles.outlines?.square : undefined}
              color="#428cf4"
            />
            <SportTilesMapLayer
              id="cluster"
              tiles={tiles.cluster}
              outline={useOutlines ? tiles.outlines?.cluster : undefined}
              color="#2ca57e"
            />
            <SportTilesMapLayer
              id="tiles"
              tiles={tiles.rest}
              outline={useOutlines ? tiles.outlines?.rest : undefined}
              color="#ff0000"
            />
            {tiles.new && (
              <SportTilesMapLayer id="new" tiles={tiles.new} color="#ffc107" />
            )}
          </>
        )}
        {showActivities && mapLoaded && (
          <>
            <SportActivitiesMapLayer
              id="activities"
              activities={activities.nodes}
              activityMonths={activityMonths}
              monthIndex={activitiesMonthIndex}
              replacedIds={newTrackIds}
              onClick={handleActivitiesClick}
            />
            <SportNewTracksMapLayer
              id="new-tracks"
              tracks={newTracks}
              activityMonths={activityMonths}
              monthIndex={activitiesMonthIndex}
              onClick={handleActivitiesClick}
            />
            <SportTilesMapLayer
              id="selected-tile"
              tiles={selectedTileTiles}
              color={theme.colors.primary}
              fillOpacity={0.15}
              lineOpacity={1}
              lineWidth={2}
            />
            <SportTracksMapLayer id="tracks" tracks={tracks} />
            {results && (
              <MapPopup
                longitude={results.coordinates.longitude}
                latitude={results.coordinates.latitude}
                onClose={() => setResults(null)}
              >
                <SportTableActivities activities={results.activities} />
              </MapPopup>
            )}
            {selectedTile && (
              <MapPopup
                longitude={selectedTile.lngLat.lng}
                latitude={selectedTile.lngLat.lat}
                onClose={() => setSelectedTile(null)}
              >
                <TileActivities
                  activities={tileActivities}
                  hiddenIds={hiddenIds}
                  selectedIds={trackIds}
                  isShowingAll={isShowingAll}
                  onShowAllClick={() => setIsShowingAll((all) => !all)}
                  onActivityClick={toggleTileActivity}
                />
              </MapPopup>
            )}
          </>
        )}
      </MapGL>
    </View>
  )
}

const MapPopup = ({longitude, latitude, onClose, children}) => {
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

  return (
    <Popup
      className={className}
      longitude={longitude}
      latitude={latitude}
      closeButton={true}
      closeOnClick={false}
      onClose={onClose}
    >
      <View>{children}</View>
    </Popup>
  )
}

// The activities going through a tile, hidden ones included, up to the month
// the map shows. A click on one draws its whole track.
const TileActivities = ({
  activities,
  hiddenIds,
  selectedIds,
  isShowingAll,
  onShowAllClick,
  onActivityClick,
}) => {
  const selected = useMemo(() => new Set(selectedIds), [selectedIds])

  if (!activities) {
    return (
      <Text>
        <FormattedMessage id="sport.map.tile.loading" />
      </Text>
    )
  }

  return (
    <View css={{gap: 1}}>
      <View
        css={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          // Room for the close button of the popup
          mr: 3,
        }}
      >
        <Text>
          <FormattedMessage
            id="sport.map.tile.count"
            values={{count: activities.length, hidden: hiddenIds.size}}
          />
        </Text>
        {activities.length > 0 && (
          <Button
            noArrow
            onClick={onShowAllClick}
            text={
              <FormattedMessage
                id={
                  isShowingAll
                    ? "sport.map.tile.hide-all"
                    : "sport.map.tile.show-all"
                }
              />
            }
          />
        )}
      </View>
      {activities.length > 0 && (
        <View css={{maxHeight: 300, overflowY: "auto"}}>
          <SportTableActivities
            activities={activities}
            onActivityClick={onActivityClick}
            selectedIds={selected}
            mutedIds={hiddenIds}
          />
        </View>
      )}
    </View>
  )
}
