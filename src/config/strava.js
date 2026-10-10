const polyline = require("@mapbox/polyline")
const geocoder = require("city-reverse-geocoder")

// Activities whose `summary_polyline` is too coarse to cover every tile they
// crossed, given the full `latlng` stream instead
const preciseActivities = new Set([
  "9374311551",
  "11488068367",
  "12400937964",
  "9929447862",
  "12760080529",
  "13387788770",
  "12136252978",
  "12550480223",
  "12975181877",
  "14672885874",
  "15975980367",
  "6559407113",
  "10044133632",
  "10424110936",
  "12333481360",
  "12341466978",
  "12406474961",
  "13381440332",
  "13688430263",
  "14808288598",
  "3687282041",
  "3779465357",
  "5328169074",
  "9006784246",
  "9195204092",
  "9992320357",
  "10353152557",
  "10512663985",
  "10602250774",
  "10779828821",
  "10972248657",
  "11015114886",
  "11088416310",
  "11322778778",
  "11361172308",
  "11440054131",
  "11571417877",
  "11596547696",
  "11683718042",
  "11821843130",
  "11830036140",
  "11835444208",
  "11843420851",
  "11848004454",
  "11854388083",
  "11991346920",
  "12051648821",
  "12102953709",
  "12542342459",
  "12571975710",
  "12646198052",
  "13015852010",
  "13114018949",
  "13815945207",
  "14629187620",
  "14683424291",
  "14715478766",
  "15407861073",
  "15545363289",
  "15592603950",
  "15603912669",
  "15987441704",
  "16276728178",
  "1628256735",
  "16322246266",
  "16998303314",
  "18065936200",
  "18158752375",
  "18249347246",
  "18357533129",
  "18901625046",
  "1958975547",
  "2031556448",
  "2272610960",
  "2413163757",
  "2414353234",
  "2417930187",
  "2527643105",
  "2542552780",
  "2585033670",
  "2606635294",
  "2621119594",
  "2630094236",
  "2643893965",
  "2649813440",
  "2955035131",
  "3144329179",
  "3488904002",
  "3534736241",
  "3592120669",
  "3663163800",
  "3668058995",
  "3701721039",
  "3732864056",
  "5007428199",
  "5012574772",
  "5075049836",
  "5078076631",
  "5083579642",
  "5195508145",
  "5338542177",
  "5360832166",
  "5442003685",
  "5792862614",
  "5813412619",
  "6564414468",
  "7063987229",
  "7935157471",
  "8198401041",
  "8775822097",
  "8938623307",
  "8979197191",
  "9068347916",
  "9281049219",
  "9773166921",
  "9909628073",
  "9942833684",
])

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
        new Date().getMonth() - 1,
        new Date().getDate()
      ).getTime() / 1000,
    // Also read by `yarn sync-activities`, which fetches the stream of the
    // listed activities already in the store
    streamsTypes: ["latlng"],
    withStreams: (activity) => preciseActivities.has(String(activity.id)),
    extend: ({activity}) => transformStravaActivity(activity),
  },
  athlete: {
    extend: ({activities, athlete}) =>
      transformStravaAthlete(athlete, activities),
  },
}
