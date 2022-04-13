import {graphql, useStaticQuery} from "gatsby"
import React, {useCallback, useEffect, useMemo, useState} from "react"

import {View} from "./view"
import {WorldMap} from "./world-map"

export const AnimationTravel = ({...props}) => {
  const data = useStaticQuery(graphql`
    query WorldAnimatedQueryQuery {
      countries: allGoogleDocs(
        filter: {
          index: {eq: true}
          country: {ne: null}
          region: {eq: null}
          locale: {eq: "fr"}
        }
      ) {
        nodes {
          slug
          name
          country
        }
      }
      regions: allGoogleDocs(
        filter: {
          index: {eq: true}
          region: {ne: null}
          showOnMap: {eq: true}
          locale: {eq: "fr"}
        }
      ) {
        nodes {
          slug
          name
          country: region
        }
      }
    }
  `)

  const countries = useMemo(
    () =>
      [...data.countries.nodes, ...data.regions.nodes].reduce(
        (acc, {slug, name, country}) => ({
          ...acc,
          [country]: {slug, name},
        }),
        {}
      ),
    [data]
  )

  const countriesCodes = useMemo(() => Object.keys(countries), [countries])

  const getRandomCountry = useCallback(
    () => countriesCodes[Math.floor(Math.random() * countriesCodes.length)],
    [countriesCodes]
  )
  const [countryCode, setCountryCode] = useState(getRandomCountry())
  useEffect(() => {
    let id = setInterval(() => {
      setCountryCode(getRandomCountry())
    }, 2000)
    return () => clearInterval(id)
  }, [getRandomCountry])

  return (
    <View css={{flex: 1}}>
      <WorldMap
        countries={countries}
        selectedCountry={countryCode}
        {...props}
      />
    </View>
  )
}
