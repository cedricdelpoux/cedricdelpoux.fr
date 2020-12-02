import "mapbox-gl/dist/mapbox-gl.css"

import Loadable from "@loadable/component"
import {ThemeContext, useGlobalCss} from "css-system"
import {graphql} from "gatsby"
import MapGL, {
  Layer,
  Source,
  Marker,
  NavigationControl,
  ScaleControl,
} from "@urbica/react-map-gl"
import React, {useCallback, useContext, useMemo, useState} from "react"

import {Html} from "../components/html"
import {LayoutPage} from "../layouts/page"
import {View} from "../components/view"
import {getColorsScale} from "../utils/colors"

const {Scrollama, Step} = Loadable(() => import("react-scrollama"))

export default ({
  data: {
    googleDocs: {
      name: title,
      childMarkdownRemark: {html, excerpt},
      map: {route, points},
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
    () => getColorsScale([theme.colors.secondary, theme.colors.primary]),
    [theme]
  )

  const chapters = useMemo(() => {
    const chapters = html.split(/(?=<h2)/)
    return points.map((point, index) => {
      return {
        id: index,
        html: chapters[index] || "",
        point,
      }
    })
  }, [points, html])
  const [currentChapter, setCurrentChapter] = useState(chapters[0])

  const onStepEnter = useCallback(
    ({data: chapter}) => {
      setCurrentChapter(chapter)
    },
    [route]
  )

  const {latitude, longitude} = useMemo(() => {
    const point = route[currentChapter.point.routeIndex]
    return {
      latitude: point[1],
      longitude: point[0],
    }
  }, [route, currentChapter])

  return (
    <LayoutPage
      title={title}
      description={excerpt}
      css={{
        maxWidth: "unset",
        px: 0,
        mb: 0,
      }}
    >
      <View
        css={{
          flexDirection: {_: "column", s: "row"},
          gap: 0,
          position: {_: "sticky", s: "unset"},
          height: {_: "100vh", s: "auto"},
          top: 0,
        }}
      >
        <View
          css={{
            flex: {s: 1},
            px: {_: 1, s: 2, m: 3},
            gap: 3,
            height: {_: "50vh", s: "auto"},
            overflow: {_: "scroll", s: "auto"},
          }}
        >
          <Scrollama onStepEnter={onStepEnter}>
            {chapters.map((chapter, index) => (
              <Step key={index} data={chapter}>
                <View>
                  <Html html={chapter.html} />
                </View>
              </Step>
            ))}
          </Scrollama>
        </View>
        <View
          css={{
            flex: {s: 1},
            height: {_: "50vh", s: "100vh"},
            position: {s: "sticky"},
            top: {s: 0},
          }}
        >
          <MapGL
            style={{
              height: "100%",
            }}
            mapStyle="mapbox://styles/mapbox/satellite-v9"
            accessToken={process.env.GATSBY_MAPBOX_TOKEN}
            latitude={latitude}
            longitude={longitude}
            zoom={7}
            viewportChangeMethod="easeTo"
            viewportChangeOptions={{
              duration: 1000,
              animate: true,
            }}
            attributionControl={false}
          >
            <Source
              id="routeSource"
              type="geojson"
              data={{
                type: "Feature",
                geometry: {
                  type: "LineString",
                  coordinates: route.slice(0, currentChapter.point.routeIndex),
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
            {chapters
              .filter((chapter) => chapter.id <= currentChapter.id)
              .map((chapter) => {
                return (
                  <Marker
                    key={chapter.id}
                    longitude={chapter.point.longitude}
                    latitude={chapter.point.latitude}
                  >
                    <View
                      css={{
                        background: theme.colors.gradient,
                        borderRadius: "50%",
                      }}
                      style={{
                        width: chapter.id === currentChapter.id ? 30 : 20,
                        height: chapter.id === currentChapter.id ? 30 : 20,
                      }}
                    />
                  </Marker>
                )
              })}
            <NavigationControl showZoom position="top-right" />
            <ScaleControl unit="metric" position="bottom-right" />
          </MapGL>
        </View>
      </View>
    </LayoutPage>
  )
}

export const pageQuery = graphql`
  query TravelStory($country: String!) {
    googleDocs(country: {eq: $country}, template: {eq: "travel-story"}) {
      name
      map {
        route
        points {
          latitude
          longitude
          routeIndex
        }
      }
      childMarkdownRemark {
        html
        excerpt
      }
    }
  }
`
