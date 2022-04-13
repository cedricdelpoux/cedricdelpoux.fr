import {ThemeContext} from "css-system"
import React, {useContext, useEffect, useRef, useState} from "react"

import {countriesData} from "../utils/countries"
import {Link} from "./link"
import {View} from "./view"

const scaleFactor = 3

function getSvgPoint(svg, x, y) {
  var svgPoint = svg.createSVGPoint()
  svgPoint.x = x
  svgPoint.y = y
  return svgPoint.matrixTransform(svg.getScreenCTM().inverse())
}

export const WorldMap = ({css, countries = [], selectedCountry}) => {
  const svgRef = useRef(null)
  const theme = useContext(ThemeContext)
  const [zoomCoords, setZoomCoords] = useState(null)

  useEffect(() => {
    const country = document.querySelector(
      `[data-country="${selectedCountry}"]`
    )

    if (!country) return

    const countryCoords = country.getBoundingClientRect()

    const point = {
      x: countryCoords.x + countryCoords.width / 2,
      y: countryCoords.y + countryCoords.height / 2,
    }
    const svgPoint = getSvgPoint(svgRef.current, point.x, point.y)
    setZoomCoords({
      x: svgPoint.x,
      y: svgPoint.y,
      xScaled: svgPoint.x - scaleFactor * svgPoint.x,
      yScaled: svgPoint.y - scaleFactor * svgPoint.y,
    })
  }, [svgRef, setZoomCoords, selectedCountry])

  return (
    <View
      ref={svgRef}
      as="svg"
      id="world"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1100 690"
      css={{
        "& path": {
          zIndex: 0,
          fill: theme.colors.backgroundLight,
          stroke: theme.colors.background,
          strokeWidth: 1,
          paintOrder: "stroke",
        },
        ...Object.keys(countries).reduce((acc, country) => {
          acc[`& [data-country="${country}"]`] = {
            fill: "url(#svg-gradient)",
          }
          return acc
        }, {}),
        ...css,
      }}
      deps={[countries]}
    >
      <g id="countries">
        <rect
          x="0"
          y="0"
          width="1100"
          height="690"
          fill={theme.colors.background}
        />
        {countriesData.map(({iso, code, name, d}) => {
          const path = (
            <path
              key={code}
              data-iso={iso}
              data-country={code}
              title={name}
              d={d}
            />
          )
          return Object.keys(countries).includes(code) ? (
            <Link key={code} to={countries[code].slug} css={{outline: "none"}}>
              {path}
            </Link>
          ) : (
            path
          )
        })}
      </g>
      {zoomCoords && (
        <>
          <defs>
            <clipPath id="circleClip">
              <circle
                cx={zoomCoords.x}
                cy={zoomCoords.y}
                r="30"
                style={{
                  transitionDuration: theme.transition,
                  transitionProperty: "all",
                }}
              />
            </clipPath>
            <path
              id="circlePath"
              d={`M 0, 0 m -100, 0 a 100,100 0 0,1 200,0 a 100,100 0 0,1-200,0`}
            />
          </defs>
          <g
            style={{
              transform: `translate(${zoomCoords.xScaled}px,${zoomCoords.yScaled}px) scale(${scaleFactor},${scaleFactor})`,
              transitionDuration: theme.transition,
              transitionProperty: "all",
            }}
          >
            <circle
              cx={zoomCoords.x}
              cy={zoomCoords.y}
              stroke="url(#svg-gradient)"
              strokeWidth={3}
              style={{
                transitionDuration: theme.transition,
                transitionProperty: "all",
              }}
              r="30"
            />
            <use xlinkHref="#countries" clipPath="url(#circleClip)" />
          </g>
          <text
            dy={-5}
            dx={-5}
            fill="url(#svg-gradient)"
            stroke={theme.colors.background}
            paintOrder="stroke"
            strokeWidth={10}
            fontSize={40}
            style={{
              transform: `translate(${zoomCoords.x}px, ${zoomCoords.y}px)`,
              transitionDuration: theme.transition,
              transitionProperty: "all",
            }}
          >
            <textPath xlinkHref="#circlePath">
              {countries[selectedCountry].name}
            </textPath>
          </text>
        </>
      )}
    </View>
  )
}
