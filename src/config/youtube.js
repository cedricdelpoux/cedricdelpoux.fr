exports.youtubeOptions = {
  updateVideo: (video) => {
    const countryTag = video.tags.find((tag) => tag.startsWith("country"))
    const regionTag = video.tags.find((tag) => tag.startsWith("region"))
    let country
    let region

    if (countryTag) {
      ;[, country] = countryTag.split(":")
    }

    if (regionTag) {
      ;[, region] = regionTag.split(":")
    }

    return {
      ...video,
      country,
      region,
    }
  },
}
