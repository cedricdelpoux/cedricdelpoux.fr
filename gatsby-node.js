const fs = require("fs")
const path = require("path")
const readingTime = require("reading-time")
const {getTileActivities} = require("gatsby-strava-tiles")

const {isMapActivity} = require("./src/config/strava-declutter")

const countryData = {}

exports.onCreateNode = async ({node, cache, actions: {createNodeField}}) => {
  if (node.internal.type === "GoogleMyMaps") {
    await cache.set("mymaps-" + node.name, node.id)
    await cache.set("polyline-" + node.name, node.polyline)
  }

  if (node.internal.type === "YoutubeVideo") {
    if (node.country) {
      const videos = (await cache.get("videos-" + node.country)) || []
      await cache.set("videos-" + node.country, [...videos, node.id])
    }

    if (node.region) {
      const videos = (await cache.get("videos-" + node.region)) || []
      await cache.set("videos-" + node.region, [...videos, node.id])
    }
  }

  // Since gatsby-source-google-docs v3 the documents are written as files and
  // reach Gatsby as `Mdx` nodes, with their metadata under `frontmatter`.
  if (node.internal.type === "Mdx") {
    // gatsby-plugin-mdx v4 dropped `timeToRead`, it is up to the site now
    createNodeField({
      node,
      name: "timeToRead",
      value: readingTime(node.body || ""),
    })
  }

  if (node.internal.type === "Mdx" && node.frontmatter) {
    const {country, region} = node.frontmatter

    if (region) {
      const photos = await cache.get("photos-" + region)
      const videos = await cache.get("videos-" + region)
      const data = countryData[country]?.regions[region] || {}

      createNodeField({node, name: "photosIds", value: photos})
      createNodeField({node, name: "videosIds", value: videos})
      createNodeField({node, name: "photosCount", value: data.photosCount || 0})
      createNodeField({node, name: "lastVisitDate", value: data.lastVisitDate})
    } else if (country) {
      const photos = await cache.get("photos-" + country)
      const videos = await cache.get("videos-" + country)
      const data = countryData[country] || {}
      const polyline = await cache.get("polyline-" + country)
      const map = await cache.get("mymaps-" + country)

      createNodeField({node, name: "photosIds", value: photos})
      createNodeField({node, name: "videosIds", value: videos})
      createNodeField({node, name: "photosCount", value: data.photosCount || 0})
      createNodeField({node, name: "lastVisitDate", value: data.lastVisitDate})
      createNodeField({node, name: "mapId", value: map})
      createNodeField({node, name: "polyline", value: polyline})
    }
  }

  if (node.internal.type === "CloudinaryMedia") {
    // Date
    const [dateString, time] = node.display_name.split("_")
    const [year, month, day] = dateString.split("-")
    const [hour, minute, second] = time.split("-")
    const date = new Date(
      `${year}-${month}-${day}T${hour}:${minute}:${second}Z`
    ) // Should be GMT+2 but Gatsby format as local dates in queries

    createNodeField({node, name: "date", value: date})

    // Category, country, region
    const [category, country, region] = node.asset_folder.split("/")

    if (country) {
      if (!countryData[country]) {
        countryData[country] = {
          photosCount: 0,
          lastVisitDate: date,
          regions: {},
        }
      }

      countryData[country].photosCount = countryData[country].photosCount + 1

      if (date > countryData[country].lastVisitDate) {
        countryData[country].lastVisitDate = date
      }
      const photos = (await cache.get("photos-" + country)) || []

      await cache.set("photos-" + country, [...photos, node.id])
    }

    if (region) {
      if (!countryData[country].regions[region]) {
        countryData[country].regions[region] = {
          photosCount: 0,
          lastVisitDate: date,
        }
      }

      countryData[country].regions[region].photosCount =
        countryData[country].regions[region].photosCount + 1

      if (date > countryData[country].regions[region].lastVisitDate) {
        countryData[country].regions[region].lastVisitDate = date
      }

      const photos = (await cache.get("photos-" + region)) || []
      await cache.set("photos-" + region, [...photos, node.id])
    }

    createNodeField({node, name: "category", value: category})
    createNodeField({node, name: "country", value: country})
    createNodeField({node, name: "region", value: region})
  }
}

exports.createSchemaCustomization = ({actions}) => {
  const {createTypes} = actions

  createTypes(`
    type Mdx implements Node {
      map: GoogleMyMaps @link(from: "fields.mapId")
      photos: [CloudinaryMedia] @link(from: "fields.photosIds")
      videos: [YoutubeVideo] @link(from: "fields.videosIds")
      timeToRead: Float @proxy(from: "fields.timeToRead.minutes")
    }
  `)

  createTypes(`
    type GeoJSON {
      type: String!
      coordinates: [[Float!]!]!
    }
  `)

  createTypes(`
    type StravaActivityMap implements Node {
      geoJSON: GeoJSON
    }
  `)

  createTypes(`
    type StravaActivity implements Node {
      id: ID!
      start_latlng: [Float!]
      end_latlng: [Float!]
      map: StravaActivityMap
    }
  `)

  // The monthly parts of gatsby-strava-tiles repeat every tile covered so far,
  // tens of megabytes in a page: the browser sums up the new ones instead
  createTypes(`
    type TilesMonth {
      yearMonth: String!
      square: TileBorder
      new: [Tile!]!
    }
  `)
}

// Same approach as gatsby-strava-tiles: `createResolvers` adds the field to a
// type gatsby-source-strava owns, without a conflict warning
exports.createResolvers = ({createResolvers}) => {
  createResolvers({
    StravaAthlete: {
      tilesTimeline: {
        type: "[TilesMonth!]!",
        resolve: (source) =>
          (source.fields?.tiles?.monthly || []).map(({yearMonth, parts}) => ({
            yearMonth,
            square: parts.squareSize > 0 ? parts.squareBorder : null,
            new: parts.new,
          })),
      },
    },
  })
}

// Out of the page query, which they would double in size
exports.onPostBootstrap = ({getNodesByType, store}) => {
  const activities = getNodesByType("StravaActivity").filter(
    (node) => isMapActivity(node) && node.coordinates?.length > 1
  )
  const publicDir = path.join(store.getState().program.directory, "public")
  const tracks = {}

  activities.forEach((node) => {
    const encoded = node.map && (node.map.polyline || node.map.summary_polyline)

    if (encoded) tracks[node.id] = encoded
  })

  fs.mkdirSync(publicDir, {recursive: true})
  fs.writeFileSync(path.join(publicDir, "tracks.json"), JSON.stringify(tracks))
  fs.writeFileSync(
    path.join(publicDir, "tile-activities.json"),
    JSON.stringify(getTileActivities(activities))
  )
}

exports.onCreatePage = ({page}) => {
  if (page.path.match(/^\/resume/) || page.path.match(/^\/tiles/)) {
    page.context.layout = "blank"
  }
}
