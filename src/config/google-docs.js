exports.googleDocsOptions = {
  debug: process.env.DEBUG,
  folder: process.env.GOOGLE_DOCS_FOLDER,
  skipImages: process.env.MINIMAL === true ? true : false,
  createPages: true,
  pageContext: ["locale", "category", "country", "region"],
}
