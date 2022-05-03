require("dotenv").config()

const {manifestOptions} = require("./src/config/manifest")
const {nprogressOptions} = require("./src/config/nprogress")
const {svgOptions} = require("./src/config/react-svg")
const {cssOptions} = require("./src/config/css-system")
const {feedOptions} = require("./src/config/feed")
const {githubOptions} = require("./src/config/github")
const {stravaOptions} = require("./src/config/strava")
const {googleMymapsOptions} = require("./src/config/google-mymaps")
const {googlePhotosOptions} = require("./src/config/google-photos")
const {googleDocsOptions} = require("./src/config/google-docs")
const {youtubeOptions} = require("./src/config/youtube")
const {filesystemOptions} = require("./src/config/filesystem")
const {mdxOptions} = require("./src/config/mdx")
const {gaOptions} = require("./src/config/google-analytics.js")
const {webfontsOptions} = require("./src/config/webfonts.js")
const {siteConfig} = require("./src/config/site.js")

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
    "gatsby-plugin-netlify",
    {resolve: "gatsby-plugin-webfonts", options: webfontsOptions},
    {resolve: "@css-system/gatsby-plugin-css-system", options: cssOptions},
    {resolve: "gatsby-plugin-react-svg", options: svgOptions},
    {resolve: "gatsby-source-filesystem", options: filesystemOptions},
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
