exports.googleDocsOptions = {
  debug: process.env.GOOGLE_DOCS_DEBUG,
  folder: process.env.GOOGLE_DOCS_FOLDER,
  skipImages: process.env.MINIMAL ? true : false,
  imagesOptions: {
    width: 680,
    height: 400,
  },
  createPages: true,
  pageContext: ["locale", "category", "country", "region"],
}
