const polyline = require("@mapbox/polyline")
const geocoder = require("city-reverse-geocoder")

const toKebabCase = (str) =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join("-")

const twoDigit = (number) => String(number).padStart(2, "0")

const countriesFix = {
  "Bosnia And Herzegowina": "bosnia",
  Israel: "jordan",
  Reunion: "france",
}

const transformStravaActivity = (activity) => {
  // Add country and city
  if (activity.start_latlng) {
    const latitude = activity.start_latlng[0]
    const longitude = activity.start_latlng[1]
    const nearestCities = geocoder(latitude, longitude)
    const {city, nearCountry} = nearestCities[0]
    const country = countriesFix[nearCountry] || toKebabCase(nearCountry)
    Object.assign(activity, {city, country})
  }

  // Add geoJSON map
  if (activity.map && activity.map.summary_polyline) {
    activity.map.geoJSON = polyline.toGeoJSON(activity.map.summary_polyline)
  }

  // Add date fields
  const date = new Date(activity.start_date)
  const year = date.getFullYear()
  const month = twoDigit(date.getMonth() + 1)
  const day = twoDigit(date.getDate())
  const year_month = `${year}-${month}`
  activity.date = date
  activity.date_year = year
  activity.date_month = month
  activity.date_year_month = year_month
  activity.date_day = day
}

const transformStravaAthlete = (athlete, activities) => {
  const sortByPopularity = (a, b) => b.count - a.count
  const activitiesTypes = ["Run", "Ride"]
  let countByTypes = activitiesTypes.reduce(
    (acc, type) => ({...acc, [type]: 0}),
    {}
  )
  let countByCities = activitiesTypes.reduce(
    (acc, type) => ({...acc, [type]: []}),
    {}
  )
  let countByCountries = activitiesTypes.reduce(
    (acc, type) => ({...acc, [type]: []}),
    {}
  )

  activities
    .filter(
      (activity) =>
        activitiesTypes.includes(activity.type) &&
        activity.map?.summary_polyline
    )
    .forEach((activity) => {
      // Add activities counts
      const nearestCities = geocoder(
        activity.start_latlng[0],
        activity.start_latlng[1]
      )

      const {city, country, latitude, longitude} = nearestCities[0]

      const countryIndex = countByCountries[activity.type].findIndex(
        (c) => c.name === country
      )

      if (countryIndex !== -1) {
        countByCountries[activity.type][countryIndex].count++
      } else {
        countByCountries[activity.type].push({
          name: country,
          count: 1,
        })
      }

      const cityIndex = countByCities[activity.type].findIndex(
        (c) => c.name === city
      )
      if (cityIndex !== -1) {
        countByCities[activity.type][cityIndex].count++
      } else {
        countByCities[activity.type].push({
          name: city,
          country,
          latitude,
          longitude,
          count: 1,
        })
      }

      countByTypes[activity.type]++
    })

  activitiesTypes.forEach((type) => {
    countByCities[type].sort(sortByPopularity)
    countByCountries[type].sort(sortByPopularity)
  })

  athlete.activitiesCounts = {
    types: countByTypes,
    cities: countByCities,
    countries: countByCountries,
  }
}

exports.stravaOptions = {
  debug: process.env.STRAVA_DEBUG,
  stravaClientId: process.env.STRAVA_CLIENT_ID,
  stravaClientSecret: process.env.STRAVA_CLIENT_SECRET,
  stravaToken: process.env.STRAVA_TOKEN,
  activities: {
    after:
      process.env.MINIMAL &&
      new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 12,
        new Date().getDate()
      ).getTime() / 1000,
    extend: ({activity}) => transformStravaActivity(activity),
  },
  athlete: {
    extend: ({activities, athlete}) =>
      transformStravaAthlete(athlete, activities),
  },
}
