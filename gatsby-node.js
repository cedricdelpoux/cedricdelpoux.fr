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

      createNodeField({node, name: "albumId", value: album})
      createNodeField({node, name: "videosIds", value: videos})
    }

    if (node.template === "travel-country" && node.country) {
      const album = await cache.get("album-" + node.country)
      const videos = await cache.get("videos-" + node.country)

      createNodeField({node, name: "albumId", value: album})
      createNodeField({node, name: "videosIds", value: videos})
    }

    if (node.template === "travel-story" && node.country) {
      const polyline = await cache.get("polyline-" + node.country)
      const map = await cache.get("mymaps-" + node.country)
      node.polyline = polyline

      createNodeField({node, name: "mapId", value: map})
    }
  }
}

exports.createSchemaCustomization = ({actions}) => {
  const {createTypes} = actions

  createTypes(`
    type GoogleDocs implements Node {
      map: GoogleMyMaps @link(from: "fields.mapId")
      album: GooglePhotosAlbum @link(from: "fields.albumId")
      videos: [YoutubeVideo] @link(from: "fields.videosIds")
    }
  `)
}

exports.onCreatePage = ({page}) => {
  if (page.path.match(/^\/resume/)) {
    page.context.layout = "blank"
  }
}
