require("dotenv").config()

const {
  NODE_ENV,
  GITHUB_TOKEN,
  GOOGLE_ANALYTICS_ID,
  GOOGLE_DOCS_FOLDER,
  STRAVA_CLIENT_ID,
  STRAVA_CLIENT_SECRET,
  STRAVA_TOKEN,
} = process.env

const {colors} = require("./theme.js")
const {transformMymaps} = require("./src/utils/node/transform-mymaps")
const {transformYoutubeVideo} = require("./src/utils/node/transform-youtube")
const {
  transformStravaActivity,
  transformStravaAthlete,
} = require("./src/utils/node/transform-strava")
const {
  transformGooglePhotosAlbum,
} = require("./src/utils/node/transform-google-photos")

module.exports = {
  flags: {
    FAST_DEV: true,
  },
  siteMetadata: {
    title: "Cédric Delpoux",
    siteUrl: "https://cedricdelpoux.fr",
  },
  plugins: [
    {
      resolve: "gatsby-plugin-webfonts",
      options: {
        fonts: {
          google: [
            {
              family: "Quicksand",
              variants: ["400", "700"],
              fontDisplay: "fallback",
            },
          ],
        },
        formats: ["woff2"],
        usePreload: true,
      },
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
    "gatsby-plugin-preact",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-layout",
    {
      resolve: "gatsby-source-strava",
      options: {
        debug: true,
        stravaClientId: STRAVA_CLIENT_ID,
        stravaClientSecret: STRAVA_CLIENT_SECRET,
        stravaToken: STRAVA_TOKEN,
        activities: {
          after:
            NODE_ENV === "development" &&
            new Date(
              new Date().getFullYear(),
              new Date().getMonth() - 1,
              new Date().getDate()
            ).getTime() / 1000,
          extend: ({activity}) => transformStravaActivity(activity),
        },
        athlete: {
          extend: ({activities, athlete}) =>
            transformStravaAthlete(athlete, activities),
        },
      },
    },
    {
      resolve: "gatsby-source-youtube",
      options: {
        updateVideo: (video) => transformYoutubeVideo(video),
      },
    },
    {
      resolve: "gatsby-source-google-photos",
      options: {
        albumsTitles: [
          "cedricdelpoux.fr",
          "cedricdelpoux.fr/sport",
          "cedricdelpoux.fr/travel/iceland",
          "cedricdelpoux.fr/travel/france/reunion",
          ...(NODE_ENV === "production"
            ? [
                "cedricdelpoux.fr/travel/france/corsica",
                "cedricdelpoux.fr/travel/peru",
                "cedricdelpoux.fr/travel/jordan",
                "cedricdelpoux.fr/travel/indonesia",
                "cedricdelpoux.fr/travel/new-zealand",
                "cedricdelpoux.fr/travel/austria",
                "cedricdelpoux.fr/travel/spain/tenerife",
                "cedricdelpoux.fr/travel/hungary",
                "cedricdelpoux.fr/travel/croatia",
                "cedricdelpoux.fr/travel/bosnia",
                "cedricdelpoux.fr/travel/netherlands",
                "cedricdelpoux.fr/travel/united-kingdom",
              ]
            : []),
        ],
        albumsUpdate: (album) => transformGooglePhotosAlbum(album),
        photosMaxWidth: NODE_ENV === "development" ? 512 : 1024,
        debug: true,
      },
    },
    {
      resolve: "gatsby-source-google-docs",
      options: {
        debug: true,
        folder: GOOGLE_DOCS_FOLDER,
        demoteHeadings: true,
        imagesMaxWidth: NODE_ENV === "development" ? 512 : 1024,
        updateMetadata: (metadata) => {
          let newMetadata = {
            ...metadata,
            template: metadata.template || "page",
            draft:
              NODE_ENV === "development" && metadata.template === "post"
                ? true
                : false,
          }

          // if (NODE_ENV === "development") {
          const isPost = metadata.template === "post"
          const draft = metadata.draft || isPost

          Object.assign(newMetadata, {draft})
          // }

          return newMetadata
        },
      },
    },
    {
      resolve: "gatsby-source-google-mymaps",
      options: {
        ids: [
          "1mQBBrUWGSjjvetsWwZvozaiMlOBChuW2", // Iceland
        ],
        name: "travel",
        transform: transformMymaps,
      },
    },

    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "GitHub",
        fieldName: "github",
        url: "https://api.github.com/graphql",
        headers: {
          Authorization: `bearer ${GITHUB_TOKEN}`,
        },
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          "gatsby-remark-unwrap-images",
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-autolink-headers",
          "gatsby-remark-images-medium-zoom",
          {
            resolve: "gatsby-remark-strava",
            options: {
              debug: true,
              stravaClientId: process.env.STRAVA_CLIENT_ID,
              stravaClientSecret: process.env.STRAVA_CLIENT_SECRET,
              stravaToken: process.env.STRAVA_TOKEN,
            },
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              showCaptions: true,
              maxWidth: 1000,
              linkImagesToOriginal: false,
            },
          },
          "gatsby-remark-prismjs",
        ],
      },
    },

    "gatsby-plugin-catch-links",
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: GOOGLE_ANALYTICS_ID,
        anonymize: true,
        respectDNT: true,
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Cédric Delpoux",
        short_name: "Cédric Delpoux",
        description:
          "Site de Cédric Delpoux: sport, programmation, voyages et bien plus...",
        start_url: "/",
        background_color: "#fff",
        theme_color: colors.secondary,
        display: "standalone",
        icon: "static/favicon.svg",
        icon_options: {
          purpose: "any maskable",
        },
        lang: "fr",
        localize: [
          {
            start_url: "/en",
            lang: "en",
            name: "Cédric Delpoux",
            short_name: "Cédric Delpoux",
            description:
              "Cédric Delpoux website: sport, programming, travels and more...",
          },
        ],
      },
    },
    "gatsby-plugin-sitemap",
    "gatsby-plugin-remove-trailing-slashes",
    "gatsby-plugin-netlify",
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({query: {site, posts}}) => {
              return posts.nodes.map((node) => {
                return {
                  title: node.title,
                  description: node.childMarkdownRemark.excerpt,
                  date: node.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [
                    {"content:encoded": node.childMarkdownRemark.html},
                  ],
                }
              })
            },
            query: `
              {
                posts: allGoogleDocs(
                  sort: { order: DESC, fields: [date] },
                  filter: {
                      template: {eq: "post"}
                  }
                ) {
                  nodes {
                    fields { slug }
                    name
                    date
                    childMarkdownRemark {
                      excerpt
                      html
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Cédric Delpoux",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: colors.primary,
      },
    },
    "gatsby-plugin-offline",
    // "gatsby-plugin-webpack-bundle-analyser-v2",
  ],
}
