require("dotenv").config()

const {cssOptions} = require("./src/config/css-system")
const {feedOptions} = require("./src/config/feed")
const {filesystemOptions} = require("./src/config/filesystem")
const {gaOptions} = require("./src/config/google-analytics")
const {githubOptions} = require("./src/config/github")
const {googleDocsOptions} = require("./src/config/google-docs")
const {googleMymapsOptions} = require("./src/config/google-mymaps")
const {googlePhotosOptions} = require("./src/config/google-photos")
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
    {resolve: "gatsby-plugin-netlify", options: netlifyOptions},
    {resolve: "gatsby-plugin-webfonts", options: webfontsOptions},
    {resolve: "@css-system/gatsby-plugin-css-system", options: cssOptions},
    {resolve: "gatsby-plugin-react-svg", options: svgOptions},
    {resolve: "gatsby-source-filesystem", options: filesystemOptions},
    {resolve: "gatsby-source-statshunters", options: statshuntersOptions},
    {resolve: "gatsby-source-google-mymaps", options: googleMymapsOptions},
    {resolve: "gatsby-source-strava", options: stravaOptions},
    {resolve: "gatsby-source-youtube", options: youtubeOptions},
    {resolve: "gatsby-source-google-photos", options: googlePhotosOptions},
    {resolve: "gatsby-source-google-docs", options: googleDocsOptions},
    {resolve: "gatsby-source-github-api", options: githubOptions},
    {resolve: "gatsby-plugin-mdx", options: mdxOptions},
    {resolve: "gatsby-plugin-google-analytics", options: gaOptions},
    {resolve: "gatsby-plugin-manifest", options: manifestOptions},
    {resolve: "gatsby-plugin-feed", options: feedOptions},
    {resolve: "gatsby-plugin-nprogress", options: nprogressOptions},
  ],
}
