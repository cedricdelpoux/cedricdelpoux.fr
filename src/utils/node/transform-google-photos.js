exports.transformGooglePhotosAlbum = (album) => {
  const [, category, country, region] = album.title.split("/")
  return {
    ...album,
    category,
    country,
    region,
  }
}
