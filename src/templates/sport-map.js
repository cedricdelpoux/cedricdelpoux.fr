import {FormattedMessage} from "react-intl"
import {ThemeContext, useCss} from "css-system"
import {graphql} from "gatsby"
import {useSwitchTheme} from "@css-system/gatsby-plugin-css-system"
import MapGL, {
  Filter,
  Layer,
  Popup,
  Source,
  NavigationControl,
  ScaleControl,
  FullscreenControl,
} from "@urbica/react-map-gl"
import React, {
  useEffect,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"

import {Button} from "../components/button"
import {LayoutPage} from "../layouts/page"
import {Masonry} from "../components/masonry"
import {PaperActivity} from "../components/paper-activity"
import {SelectGradient} from "../components/select"
import {SwitcherSport} from "../components/switcher-sport"
import {Sidebar} from "../components/sidebar"
import {Text} from "../components/text"
import {View} from "../components/view"

export default ({
  data: {
    googleDocs: {
      name: title,
      childMarkdownRemark: {html, excerpt},
    },
    activities,
    stravaAthlete: {
      athlete: {activitiesCounts},
    },
  },
}) => {
  const theme = useContext(ThemeContext)
  const [themeKey] = useSwitchTheme()
  const [mapLoaded, setMapLoaded] = useState(false)
  const [type, setType] = useState("Run")
  const [results, setResults] = useState(null)
  const [citiesCounts, countriesCounts] = useMemo(
    () => [activitiesCounts.cities[type], activitiesCounts.countries[type]],
    [type, activitiesCounts]
  )
  const [city, setCity] = useState(citiesCounts[0])
  const [country, setCountry] = useState(countriesCounts[0])
  const [viewState, setViewState] = useState({
    zoom: 12,
    transitionDuration: 2000,
    longitude: city.longitude,
    latitude: city.latitude,
  })

  useEffect(() => {
    const newCity = citiesCounts[0]
    const newCountry = countriesCounts.find((c) => c.name === newCity.country)
    setCity(newCity)
    setCountry(newCountry)
    setViewState((prevViewState) => ({
      ...prevViewState,
      longitude: newCity.longitude,
      latitude: newCity.latitude,
    }))
  }, [countriesCounts, citiesCounts])

  const handleCityChange = useCallback(
    (cityName) => {
      const city = citiesCounts.find((c) => c.name === cityName)
      setCity(city)
      setViewState((prevViewState) => ({
        ...prevViewState,
        longitude: city.longitude,
        latitude: city.latitude,
      }))
    },
    [citiesCounts, type]
  )

  const handleCountryChange = useCallback(
    (countryName) => {
      const country = countriesCounts.find((c) => c.name === countryName)
      const city = citiesCounts.find((c) => c.country === countryName)
      setCountry(country)
      setCity(city)
      setViewState((prevViewState) => ({
        ...prevViewState,
        longitude: city.longitude,
        latitude: city.latitude,
      }))
    },
    [citiesCounts, type, countriesCounts]
  )

  const mapboxStyle = `xuopled/${
    themeKey === "light"
      ? "ckhj9ux1x2w7x19odqmtxccea"
      : "ckhjauub03fyd19otcjzj5qnw"
  }`

  return (
    <LayoutPage
      title={title}
      html={html}
      description={excerpt}
      css={{
        maxWidth: "100%",
        px: 0,
      }}
    >
      <View
        css={{
          flexDirection: {_: "column", s: "row"},
          gap: 2,
          alignSelf: "center",
          alignItems: "center",
        }}
      >
        <SwitcherSport
          value={type}
          onChange={() =>
            setType((oldSport) => (oldSport === "Run" ? "Ride" : "Run"))
          }
        />
        <SelectGradient
          onChange={(e) => handleCountryChange(e.target.value)}
          value={country.name}
        >
          {countriesCounts.map((country) => (
            <option
              key={country.name}
              value={country.name}
            >{`${country.name} (${country.count})`}</option>
          ))}
        </SelectGradient>
        <SelectGradient
          onChange={(e) => handleCityChange(e.target.value)}
          value={city.name}
        >
          {citiesCounts
            .filter((city) => city.country === country.name)
            .map((city) => (
              <option
                key={city.name}
                value={city.name}
              >{`${city.name} (${city.count})`}</option>
            ))}
        </SelectGradient>
      </View>
      <View>
        <MapGL
          style={{
            height: "80vh",
          }}
          mapStyle={`mapbox://styles/${mapboxStyle}`}
          accessToken={process.env.GATSBY_MAPBOX_TOKEN}
          latitude={viewState.latitude}
          longitude={viewState.longitude}
          zoom={viewState.zoom}
          viewportChangeMethod="flyTo"
          onViewportChange={(viewport) => setViewState(viewport)}
          attributionControl={false}
          onLoad={() => {
            setMapLoaded(true)
          }}
        >
          {mapLoaded && (
            <>
              <Source
                id="activites"
                lineMetrics={true}
                type="geojson"
                data={{
                  type: "FeatureCollection",
                  features: activities.nodes.map(({activity}) => ({
                    type: "Feature",
                    properties: {
                      activity,
                      type: activity.type,
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
              <Filter layerId="activites" filter={["==", "type", type]} />
              <ActivitiesPopup results={results} setResults={setResults} />
              <ScaleControl unit="metric" position="bottom-right" />
              <NavigationControl showCompass showZoom position="top-right" />
              <FullscreenControl position="top-right" />
            </>
          )}
        </MapGL>
      </View>
      <Sidebar
        isOpen={results ? results.open : false}
        onClose={() => setResults(null)}
        css={{width: {_: "100vw !important", m: "75vw !important"}}}
      >
        <Masonry>
          {results &&
            results.activities &&
            results.activities.map((activity) => (
              <PaperActivity key={activity.id} activity={activity} />
            ))}
        </Masonry>
      </Sidebar>
    </LayoutPage>
  )
}

const ActivitiesPopup = ({results, setResults}) => {
  const className = useCss({
    "& > .mapboxgl-popup-content": {
      backgroundColor: "background",
      borderRadius: 2,
      "& > *": {
        color: "text",
        fontSize: "inherit",
      },
      "& > div:last-child": {
        fontSize: 3,
        display: "flex",
        flexDirection: "column",
        p: 2,
      },
      "& > .mapboxgl-popup-close-button": {
        fontSize: 4,
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
        {results.activities
          .slice(0, 3)
          .sort((a, b) => b.start_date - a.start_date)
          .map((activity) => (
            <View key={activity.id}>{activity.start_date_formatted}</View>
          ))}
        <View>{"..."}</View>
      </View>
      <Button
        css={{fontSize: "inherit", mt: 2}}
        onClick={() =>
          setResults((prevResults) => ({
            ...prevResults,
            open: true,
          }))
        }
      >
        <Text>
          <FormattedMessage id="actions.see-more" />
        </Text>
      </Button>
    </Popup>
  )
}

export const pageQuery = graphql`
  query SportMap($path: String!) {
    googleDocs(fields: {slug: {eq: $path}}) {
      name
      childMarkdownRemark {
        excerpt
      }
    }
    activities: allStravaActivity(
      filter: {
        activity: {
          type: {in: ["Run", "Ride", "Hike"]}
          map: {summary_polyline: {ne: null}}
        }
      }
      sort: {fields: [activity___start_date], order: DESC}
    ) {
      nodes {
        ...PaperActivityFragment
        activity {
          start_latlng
        }
      }
    }
    stravaAthlete(
      athlete: {firstname: {eq: "Cédric"}, lastname: {eq: "Delpoux"}}
    ) {
      athlete {
        activitiesCounts {
          cities {
            Ride {
              name
              count
              country
              latitude
              longitude
            }
            Run {
              count
              name
              country
              latitude
              longitude
            }
          }
          countries {
            Ride {
              count
              name
            }
            Run {
              count
              name
            }
          }
          types {
            Run
            Ride
          }
        }
      }
    }
  }
`
