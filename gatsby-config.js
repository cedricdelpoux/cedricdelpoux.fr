require("dotenv").config()

const {colors} = require("./theme.js")

const {manifestOptions} = require("./src/config/manifest")
const {feedOptions} = require("./src/config/feed")
const {githubOptions} = require("./src/config/github")
const {stravaOptions} = require("./src/config/strava")
const {googleMymapsOptions} = require("./src/config/google-mymaps")
const {googlePhotosOptions} = require("./src/config/google-photos")
const {googleDocsOptions} = require("./src/config/google-docs")
const {youtubeOptions} = require("./src/config/youtube")
const {mdxOptions} = require("./src/config/mdx")
const {gaOptions} = require("./src/config/google-analytics.js")
const {webfontsOptions} = require("./src/config/webfonts.js")

module.exports = {
  siteMetadata: {
    title: "Cédric Delpoux",
    siteUrl: "https://cedricdelpoux.fr",
  },
  plugins: [
    {
      resolve: "gatsby-plugin-webfonts",
      options: webfontsOptions,
    },
    {
      resolve: "@css-system/gatsby-plugin-css-system",
      options: require("./theme.js"),
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          test: /\.svg$/,
        },
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-layout",
    "gatsby-plugin-catch-links",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-remove-trailing-slashes",
    "gatsby-plugin-netlify",
    {
      resolve: "gatsby-source-google-mymaps",
      options: googleMymapsOptions,
    },
    {
      resolve: "gatsby-source-strava",
      options: stravaOptions,
    },
    {
      resolve: "gatsby-source-youtube",
      options: youtubeOptions,
    },
    {
      resolve: "gatsby-source-google-photos",
      options: googlePhotosOptions,
    },
    {
      resolve: "gatsby-source-google-docs",
      options: googleDocsOptions,
    },
    {
      resolve: "gatsby-source-github-api",
      options: githubOptions,
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: mdxOptions,
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: gaOptions,
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: manifestOptions,
    },
    {
      resolve: "gatsby-plugin-feed",
      options: feedOptions,
    },
    {
      resolve: "gatsby-plugin-nprogress",
      options: {
        color: colors.primary,
      },
    },
  ],
}
