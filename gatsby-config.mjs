// Must run before the config modules below: they read `process.env` when loaded
import "./load-env.mjs"

import remarkGfm from "remark-gfm"

import {cssOptions} from "./src/config/css-system.js"
import {feedOptions} from "./src/config/feed.js"
import {filesystemOptions} from "./src/config/filesystem.js"
import {githubOptions} from "./src/config/github.js"
import {googleDocsOptions} from "./src/config/google-docs.js"
import {googleMymapsOptions} from "./src/config/google-mymaps.js"
import {manifestOptions} from "./src/config/manifest.js"
import {mdxOptions} from "./src/config/mdx.js"
import {netlifyOptions} from "./src/config/netlify.js"
import {nprogressOptions} from "./src/config/nprogress.js"
import {siteConfig} from "./src/config/site.js"
import {stravaOptions} from "./src/config/strava.js"
import {stravaDeclutterOptions} from "./src/config/strava-declutter.js"
import {svgOptions} from "./src/config/react-svg.js"
import {youtubeOptions} from "./src/config/youtube.js"
import {
  cloudinarySourceOptions,
  cloudinaryTransformerOptions,
} from "./src/config/cloudinary.js"

const config = {
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
    "gatsby-plugin-layout",
    "gatsby-plugin-catch-links",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-transformer-cloudinary",
      options: cloudinaryTransformerOptions,
    },
    {resolve: "@css-system/gatsby-plugin-css-system", options: cssOptions},
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        ...mdxOptions,
        mdxOptions: {
          // MDX only supports CommonMark: without this, the tables and the
          // ~~strikethrough~~ gatsby-source-google-docs generates are
          // rendered as raw text.
          remarkPlugins: [remarkGfm],
        },
      },
    },
    {resolve: "gatsby-plugin-netlify", options: netlifyOptions},
    {resolve: "gatsby-plugin-react-svg", options: svgOptions},
    {resolve: "gatsby-source-filesystem", options: filesystemOptions},
    {resolve: "gatsby-source-strava", options: stravaOptions},
    // They MUST be after `gatsby-source-strava`
    "gatsby-strava-tiles",
    {resolve: "gatsby-strava-declutter", options: stravaDeclutterOptions},
    {resolve: "gatsby-source-github-api", options: githubOptions},
    // The order of the following source plugins is important.
    // gatsby-source-google-docs must be last
    {resolve: "gatsby-source-google-mymaps", options: googleMymapsOptions},
    {resolve: "gatsby-source-cloudinary", options: cloudinarySourceOptions},
    {resolve: "gatsby-source-youtube", options: youtubeOptions},
    {resolve: "gatsby-source-google-docs", options: googleDocsOptions},
    // ---
    {resolve: "gatsby-plugin-manifest", options: manifestOptions},
    {resolve: "gatsby-plugin-feed", options: feedOptions},
    {resolve: "gatsby-plugin-nprogress", options: nprogressOptions},
  ],
}

export default config
