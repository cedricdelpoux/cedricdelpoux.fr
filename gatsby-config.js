require("dotenv").config()

const {cssOptions} = require("./src/config/css-system")
const {feedOptions} = require("./src/config/feed")
const {filesystemOptions} = require("./src/config/filesystem")
const {gaOptions} = require("./src/config/google-analytics")
const {githubOptions} = require("./src/config/github")
const {googleDocsOptions} = require("./src/config/google-docs")
const {googleMymapsOptions} = require("./src/config/google-mymaps")
const {manifestOptions} = require("./src/config/manifest")
const {mdxOptions} = require("./src/config/mdx")
const {netlifyOptions} = require("./src/config/netlify")
const {nprogressOptions} = require("./src/config/nprogress")
const {siteConfig} = require("./src/config/site")
const {statshuntersOptions} = require("./src/config/statshunters")
const {stravaOptions} = require("./src/config/strava")
const {svgOptions} = require("./src/config/react-svg")
const {webfontsOptions} = require("./src/config/webfonts")
const {youtubeOptions} = require("./src/config/youtube")
const {
  cloudinarySourceOptions,
  cloudinaryTransformerOptions,
} = require("./src/config/cloudinary")

module.exports = {
  trailingSlash: "never",
  siteMetadata: {
    title: siteConfig.title,
    siteUrl: siteConfig.url,
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-transformer-json",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-layout",
    "gatsby-plugin-catch-links",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-transformer-cloudinary",
      options: cloudinaryTransformerOptions,
    },
    {resolve: "@css-system/gatsby-plugin-css-system", options: cssOptions},
    {resolve: "gatsby-plugin-mdx", options: mdxOptions},
    {resolve: "gatsby-plugin-netlify", options: netlifyOptions},
    {resolve: "gatsby-plugin-webfonts", options: webfontsOptions},
    {resolve: "gatsby-plugin-react-svg", options: svgOptions},
    {resolve: "gatsby-source-filesystem", options: filesystemOptions},
    {resolve: "gatsby-source-statshunters", options: statshuntersOptions},
    {resolve: "gatsby-source-strava", options: stravaOptions},
    {resolve: "gatsby-source-github-api", options: githubOptions},
    // The order of the following source plugins is important.
    // gatsby-source-google-docs must be last
    {resolve: "gatsby-source-google-mymaps", options: googleMymapsOptions},
    {resolve: "gatsby-source-cloudinary", options: cloudinarySourceOptions},
    {resolve: "gatsby-source-youtube", options: youtubeOptions},
    {resolve: "gatsby-source-google-docs", options: googleDocsOptions},
    // ---
    {resolve: "gatsby-plugin-google-analytics", options: gaOptions},
    {resolve: "gatsby-plugin-manifest", options: manifestOptions},
    {resolve: "gatsby-plugin-feed", options: feedOptions},
    {resolve: "gatsby-plugin-nprogress", options: nprogressOptions},
  ],
}
