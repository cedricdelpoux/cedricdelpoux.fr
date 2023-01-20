exports.googleDocsOptions = {
  debug: process.env.GOOGLE_DOCS_DEBUG,
  folder: process.env.GOOGLE_DOCS_FOLDER,
  skipImages: process.env.MINIMAL ? true : false,
  imagesOptions: {
    width: process.env.MINIMAL ? 300 : 1600,
    height: process.env.MINIMAL ? 150 : 800,
  },
  createPages: true,
  pageContext: ["locale", "category", "country", "region"],
}
