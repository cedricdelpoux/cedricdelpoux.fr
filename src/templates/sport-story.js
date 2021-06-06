import "mapbox-gl/dist/mapbox-gl.css"

import MapGL, {
  Layer,
  Marker,
  NavigationControl,
  ScaleControl,
  Source,
} from "@urbica/react-map-gl"
import {ThemeContext, useGlobalCss} from "css-system"
import {graphql} from "gatsby"
import React, {useContext, useLayoutEffect, useMemo, useState} from "react"
import scrollama from "scrollama"

import {Html} from "../components/html"
import {View} from "../components/view"
import {LayoutPage} from "../layouts/page"
import {getColorsScale} from "../utils/colors"

const SportStory = ({
  data: {
    googleDocs: {
      name: title,
      childMdx: {body, excerpt},
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

  const [currentPoint, setCurrentPoint] = useState(points[0])

  const [longitude, latitude] = useMemo(() => {
    return route[currentPoint.routeIndex]
  }, [route, currentPoint])

  useLayoutEffect(() => {
    console.log(Array.from(document.getElementsByTagName("h2")))
    scrollama()
      .setup({
        step: Array.from(document.getElementsByTagName("h2")),
      })
      .onStepEnter(({index}) => setCurrentPoint(points[index]))
  }, [points, setCurrentPoint])

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
        }}
      >
        <View
          css={{
            flex: {s: 1},
            px: {_: 1, s: 2, m: 3},
            gap: 3,
          }}
        >
          <Html body={body} />
        </View>
        <View
          css={{
            flex: {s: 1},
            height: {_: "30vh", s: "100vh"},
            position: "sticky",
            top: {s: 0},
            bottom: 0,
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
                  coordinates: route.slice(0, currentPoint.routeIndex),
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
            {points
              .filter((point) => point.routeIndex <= currentPoint.routeIndex)
              .map((point) => {
                const active = point.routeIndex === currentPoint.routeIndex
                return (
                  <Marker
                    key={point.routeIndex}
                    longitude={point.longitude}
                    latitude={point.latitude}
                  >
                    <View
                      css={{
                        background: theme.colors.gradient,
                        borderRadius: "50%",
                      }}
                      style={{
                        width: active ? 30 : 20,
                        height: active ? 30 : 20,
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

export default SportStory

export const pageQuery = graphql`
  query SportStory($path: String!) {
    googleDocs(slug: {eq: $path}) {
      name
      map {
        route
        points {
          latitude
          longitude
          routeIndex
        }
      }
      childMdx {
        body
        excerpt
      }
    }
  }
`
