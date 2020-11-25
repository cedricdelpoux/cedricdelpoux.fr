const {resolve} = require("path")
const isAfter = require("date-fns/isAfter")
const sub = require("date-fns/sub")
const turf = require("@turf/turf")
const mapboxPolyline = require("@mapbox/polyline")

exports.onCreateNode = async ({node, cache}) => {
  if (node.internal.type === "GoogleMyMaps") {
    const coordinates = node.layers.reduce(
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
    const simple = turf.simplify(geoJSON, {tolerance: 0.01, highQuality: false})
    const polyline = mapboxPolyline.fromGeoJSON(simple)

    await cache.set("map-" + node.name, node.id)
    await cache.set("polyline-" + node.name, polyline)
  }

  if (node.internal.type === "YoutubeVideo") {
    if (node.country) {
      const videos = (await cache.get("videos-" + node.country)) || []
      await cache.set("videos-" + node.country, [...videos, node.id])
    }

    if (node.country && node.region) {
      const videos = (await cache.get("videos-" + node.region)) || []
      await cache.set("videos-" + node.region, [...videos, node.id])
    }
  }

  if (node.internal.type === "GooglePhotosAlbum") {
    if (node.category === "travel" && node.country && !node.region) {
      await cache.set("album-" + node.country, node.id)
    }

    if (node.category === "travel" && node.country && node.region) {
      await cache.set("album-" + node.country, node.id)
      await cache.set("album-" + node.region, node.id)
    }
  }

  if (node.internal.type === "GoogleDocs") {
    if (node.template === "country-region" && node.region) {
      const album = await cache.get("album-" + node.region)
      const videos = await cache.get("videos-" + node.region)
      node.album___NODE = album
      node.videos___NODE = videos
    }

    if (node.template === "country" && node.country) {
      const album = await cache.get("album-" + node.country)
      const videos = await cache.get("videos-" + node.country)
      node.album___NODE = album
      node.videos___NODE = videos
    }

    if (node.template === "story" && node.country) {
      const polyline = await cache.get("polyline-" + node.country)
      const map = await cache.get("map-" + node.country)
      node.polyline = polyline
      node.map___NODE = map
    }
  }
}

exports.createSchemaCustomization = ({actions, schema}) => {
  actions.createTypes([
    schema.buildObjectType({
      name: "StravaActivity",
      interfaces: ["Node"],
      fields: {
        inTheLastThreeMonths: {
          type: "Boolean!",
          resolve: ({activity}) => {
            const nowDate = new Date()
            const threeMonthsAgoDate = sub(nowDate, {months: 3})
            const activityDate = new Date(activity.start_date)
            return isAfter(activityDate, threeMonthsAgoDate)
          },
        },
      },
    }),
  ])
}

exports.onCreatePage = ({page}) => {
  if (page.path.match(/^\/resume/)) {
    page.context.layout = "blank"
  }
}

exports.createPages = async ({graphql, actions: {createPage}, reporter}) => {
  const result = await graphql(
    `
      {
        allGoogleDocs {
          nodes {
            path
            template
            locale
            category
            country
            region
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panic(result.errors)
  }

  try {
    const {allGoogleDocs} = result.data

    if (allGoogleDocs) {
      allGoogleDocs.nodes.forEach(({path, template, ...context}) => {
        createPage({
          path,
          component: resolve(`src/templates/${template}.js`),
          context,
        })
      })
    }
  } catch (e) {
    console.error(e)
  }
}
