const {resolve} = require("path")
const isAfter = require("date-fns/isAfter")
const sub = require("date-fns/sub")

exports.onCreateNode = async ({node, cache}) => {
  if (node.internal.type === "GoogleMyMaps") {
    await cache.set("mymaps-" + node.name, node.id)
    await cache.set("polyline-" + node.name, node.polyline)
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
    if (node.template === "travel-region" && node.region) {
      const album = await cache.get("album-" + node.region)
      const videos = await cache.get("videos-" + node.region)
      node.album___NODE = album
      node.videos___NODE = videos
    }

    if (node.template === "travel-country" && node.country) {
      const album = await cache.get("album-" + node.country)
      const videos = await cache.get("videos-" + node.country)
      node.album___NODE = album
      node.videos___NODE = videos
    }

    if (node.template === "travel-story" && node.country) {
      const polyline = await cache.get("polyline-" + node.country)
      const map = await cache.get("mymaps-" + node.country)
      node.polyline = polyline
      node.map___NODE = map
    }
  }
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
