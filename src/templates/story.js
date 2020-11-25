import "mapbox-gl/dist/mapbox-gl.css"

import {Scrollama, Step} from "react-scrollama"
import {ThemeContext, useGlobalCss} from "css-system"
import {faChevronDoubleDown} from "@fortawesome/pro-light-svg-icons"
import {graphql} from "gatsby"
import MapGL, {Layer, Source} from "@urbica/react-map-gl"
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import chroma from "chroma-js"
import * as turf from "@turf/turf"

import {Html} from "../components/html"
import {Icon} from "../components/icon"
import {LayoutPage} from "../layouts/page"
import {View} from "../components/view"

export default ({
  data: {
    googleMyMaps,
    googleDocs: {
      name: title,
      childMarkdownRemark: {html, excerpt},
      polyline,
    },
  },
}) => {
  const theme = useContext(ThemeContext)

  useGlobalCss({
    body: {
      height: "100vh",
    },
  })

  const colorsScale = useMemo(
    () => chroma.scale([theme.colors.secondary, theme.colors.primary]),
    [theme]
  )

  const routeCoordinates = useMemo(() => {
    // console.log(polyline)
    // const coordinates = mapboxPolyline
    //   .decode(polyline)
    //   .map(([lng, lat]) => [lat, lng])
    // const layers = googleMyMaps.layers.filter((layer) => layer.name === "route")
    // const coordinates = layers.reduce(
    //   (acc, layer) => [
    //     ...acc,
    //     ...layer.lineStrings[0].coordinates.map(({longitude, latitude}) => [
    //       longitude,
    //       latitude,
    //     ]),
    //   ],
    //   []
    // )
    // return coordinates

    const coordinates = googleMyMaps.layers.reduce(
      (acc, layer) => [
        ...acc,
        ...layer.lineStrings.reduce(
          (acc, lineString) => [...acc, ...lineString.coordinates],
          []
        ),
      ],
      []
    )
    const geoJSON = {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: coordinates.map(({latitude, longitude}) => [
          longitude,
          latitude,
        ]),
      },
    }
    const simple = turf.simplify(geoJSON, {
      tolerance: 0.01,
      highQuality: false,
    })
    console.log(coordinates.length, simple.geometry.coordinates.length)
    return simple.geometry.coordinates
  }, [googleMyMaps, polyline])

  const pointsOnRoute = useMemo(() => {
    const layers = googleMyMaps.layers.filter((layer) => layer.name === "route")
    const points = layers.reduce((acc, layer) => [...acc, ...layer.points], [])
    return points
      .map((point) => {
        const line = turf.lineString(routeCoordinates)
        const pt = turf.point([
          point.coordinates.longitude,
          point.coordinates.latitude,
        ])
        const nearestPointOnLine = turf.nearestPointOnLine(line, pt)
        const [longitude, latitude] = nearestPointOnLine.geometry.coordinates
        var turfPoints = turf.featureCollection(
          routeCoordinates.map((coord) => turf.point(coord))
        )
        var {
          geometry: {coordinates: pointOnRouteCoordinates},
        } = turf.nearestPoint(nearestPointOnLine, turfPoints)
        const pointOnRouteIndex = routeCoordinates.findIndex(
          (coord) =>
            coord[0] === pointOnRouteCoordinates[0] &&
            coord[1] === pointOnRouteCoordinates[1]
        )

        return {
          ...point,
          routeIndex: pointOnRouteIndex,
          coordinates: {
            longitude,
            latitude,
          },
        }
      })
      .sort((a, b) => (a.routeIndex > b.routeIndex ? 1 : -1))
  }, [routeCoordinates, googleMyMaps])

  const chapters = useMemo(() => {
    const chapters = html.split(/(?=<h3)/)
    return pointsOnRoute
      .map((point, index) => {
        return {
          id: `point-${index}`,
          html: chapters[index] || "",
          title: point.name,
          route: {
            startIndex: index === 0 ? 0 : pointsOnRoute[index - 1].routeIndex,
            endIndex: point.routeIndex,
          },
          point,
          isDrive: false,
        }
      })
      .reduce(
        (arr, chapter) => [
          ...arr,
          {
            id: `drive-${chapter.id}`,
            isDrive: true,
            route: chapter.route,
          },
          chapter,
        ],
        []
      )
  }, [pointsOnRoute, html])

  const [mapLoaded, setMapLoaded] = useState(false)
  const [center, setCenter] = useState(() => routeCoordinates[0])
  const [zoom /*, setZoom*/] = useState(7)
  const [pitch /*, setPitch*/] = useState(0)
  const [bearing /*, setBearing*/] = useState(0)
  const [routeIndex, setRouteIndex] = useState(0)
  const [currentChapter, setCurrentChapter] = useState(
    `drive-${chapters[0].id}`
  )

  const onStepEnter = useCallback(
    ({data: chapter}) => {
      // if (!chapter.isDrive) {
      // setCenter(routeCoordinates[chapter.route.endIndex])
      // setZoom(10)
      // setPitch(60)
      // setBearing(0)
      // } else {
      // setZoom(7)
      // setPitch(0)
      // setBearing(0)
      // }
      // console.log("onStepEnter", chapter)
      setCurrentChapter(chapter.id)
    },
    [routeCoordinates]
  )

  const onStepExit = useCallback(({data: chapter}) => {
    // console.log("onStepExit", chapter)
    if (!chapter.isDrive) {
      //   setZoom(7)
      //   setPitch(0)
      //   setBearing(0)
      // } else {
      //   setZoom(10)
      //   setPitch(60)
      //   setBearing(0)
    }
  }, [])

  const onStepProgress = useCallback(
    ({data: chapter, progress}) => {
      console.log("onStepProgress", chapter.id)
      if (chapter.isDrive) {
        const {startIndex, endIndex} = chapter.route
        const indexCount = endIndex - startIndex
        const routeEndIndex = Math.floor(startIndex + indexCount * progress)
        setCenter(routeCoordinates[routeEndIndex])
        setRouteIndex(routeEndIndex)
        // setCameraIndex(cameraIndex)
      }
    },
    [routeCoordinates]
  )

  useEffect(() => {
    window.dispatchEvent(new Event("resize"))
  }, [mapLoaded])

  return (
    <LayoutPage
      title={title}
      description={excerpt}
      css={{
        maxWidth: "unset",
      }}
    >
      <View css={{flexDirection: "row", gap: 0}}>
        <View css={{pb: "50%"}}>
          <Scrollama
            onStepEnter={onStepEnter}
            onStepProgress={onStepProgress}
            onStepExit={onStepExit}
            offset={0.5}
            debug={true}
            progress={true}
          >
            {chapters.map((chapter, index) => {
              const active = chapter.id === currentChapter
              return (
                <Step key={index} data={chapter}>
                  <View
                    css={{
                      backgroundColor: active
                        ? "backgroundLight"
                        : "background",
                      position: "relative",
                      "&::before": {
                        content: active ? '""' : "",
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        right: 0,
                        width: "5px",
                        background: theme.colors.gradient,
                      },
                    }}
                    deps={[active]}
                  >
                    {!chapter.isDrive ? (
                      <View
                        css={{
                          p: 3,
                          gap: 2,
                          width: "50vw",
                        }}
                      >
                        {/* {chapter.title && (
                        <Title as="h3" css={{mt: 0}}>
                          {chapter.title}
                        </Title>
                      )} */}
                        {chapter.html && (
                          <Html
                            html={chapter.html}
                            css={{
                              "& p": {
                                m: "0 !important",
                                width: "100% !important",
                              },
                              "& img": {
                                width: "100%",
                                height: "auto",
                              },
                            }}
                          />
                        )}
                      </View>
                    ) : (
                      <View
                        css={{
                          height: 300,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Icon
                          icon={faChevronDoubleDown}
                          css={{
                            fontSize: "36px",
                          }}
                          gradient
                        />
                      </View>
                    )}
                  </View>
                </Step>
              )
            })}
          </Scrollama>
        </View>
        <View>
          <MapGL
            style={{
              height: "100vh",
              top: 0,
              width: "50vw",
              left: "50%",
              position: "sticky",
            }}
            mapStyle="mapbox://styles/mapbox/satellite-v9"
            accessToken={
              "pk.eyJ1IjoieHVvcGxlZCIsImEiOiJjamt4cjh4am8wYm5uM2tvZTNra2JseGtvIn0.-b4Vkhv8dPIbnArP4TS9UA"
            }
            latitude={center[1]}
            longitude={center[0]}
            zoom={zoom}
            pitch={pitch}
            bearing={bearing}
            // viewportChangeMethod="easeTo"
            onLoad={() => setMapLoaded(true)}
          >
            {mapLoaded && (
              <>
                <Source
                  id="routeSource"
                  type="geojson"
                  data={{
                    type: "Feature",
                    geometry: {
                      type: "LineString",
                      coordinates: routeCoordinates.slice(0, routeIndex),
                    },
                  }}
                  lineMetrics
                />
                <Layer
                  id="route"
                  type="line"
                  source="routeSource"
                  layout={{
                    "line-join": "round",
                    "line-cap": "round",
                  }}
                  paint={{
                    "line-width": 5,
                    "line-gradient": [
                      "interpolate",
                      ["linear"],
                      ["line-progress"],
                      0,
                      colorsScale(0).css(),
                      0.1,
                      colorsScale(0.1).css(),
                      0.3,
                      colorsScale(0.1).css(),
                      0.5,
                      colorsScale(0.3).css(),
                      0.9,
                      colorsScale(0.5).css(),
                      1,
                      colorsScale(1).css(),
                    ],
                  }}
                />
              </>
            )}
          </MapGL>
        </View>
      </View>
    </LayoutPage>
  )
}

export const pageQuery = graphql`
  query CountryStory($country: String!) {
    googleMyMaps(name: {eq: $country}) {
      name
      layers {
        name
        points {
          name
          coordinates {
            longitude
            latitude
          }
        }
        lineStrings {
          name
          coordinates {
            longitude
            latitude
          }
        }
      }
    }
    googleDocs(country: {eq: $country}, template: {eq: "story"}) {
      name
      polyline
      childMarkdownRemark {
        html
        excerpt
      }
    }
  }
`
