require("dotenv").config()

const {
  MINIMAL,
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
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-layout",
    {
      resolve: "gatsby-source-google-mymaps",
      options: {
        ids: [
          "1ulgu9lNgtBR0XeNVETN-dIfR2tRAis8q", // Iceland
          "1bWY-eIw_8zH-ZNfNaxyVNO5rqg9v_9yt", // Pyrenees
        ],
        name: "travel",
        transform: transformMymaps,
      },
    },
    {
      resolve: "gatsby-source-strava",
      options: {
        debug: true,
        stravaClientId: STRAVA_CLIENT_ID,
        stravaClientSecret: STRAVA_CLIENT_SECRET,
        stravaToken: STRAVA_TOKEN,
        activities: {
          after:
            MINIMAL &&
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
          "cedricdelpoux.fr/travel/iceland",
          "cedricdelpoux.fr/travel/france/reunion",
          ...(!MINIMAL
            ? [
                "cedricdelpoux.fr/sport",
                "cedricdelpoux.fr/travel/austria",
                "cedricdelpoux.fr/travel/bosnia",
                "cedricdelpoux.fr/travel/croatia",
                "cedricdelpoux.fr/travel/france/corsica",
                "cedricdelpoux.fr/travel/hungary",
                "cedricdelpoux.fr/travel/indonesia",
                "cedricdelpoux.fr/travel/italy",
                "cedricdelpoux.fr/travel/jordan",
                "cedricdelpoux.fr/travel/netherlands",
                "cedricdelpoux.fr/travel/new-zealand",
                "cedricdelpoux.fr/travel/peru",
                "cedricdelpoux.fr/travel/spain/tenerife",
                "cedricdelpoux.fr/travel/united-kingdom",
              ]
            : []),
        ],
        albumsUpdate: (album) => transformGooglePhotosAlbum(album),
        photosMaxWidth: MINIMAL ? 512 : 1024,
        debug: true,
      },
    },

    {
      resolve: "gatsby-source-google-docs",
      options: {
        debug: true,
        folder: GOOGLE_DOCS_FOLDER,
        skipImages: MINIMAL ? true : false,
        createPages: true,
        pageContext: ["locale", "category", "country", "region"],
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
      resolve: "gatsby-plugin-mdx",
      options: {
        gatsbyRemarkPlugins: [
          "gatsby-remark-unwrap-images",
          "gatsby-remark-copy-linked-files",
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
            resolve: "gatsby-remark-youtube",
            options: {
              debug: true,
            },
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              showCaptions: true,
              maxWidth: 680,
              withWebp: true,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: "gatsby-remark-gifs-to-videos",
            options: {
              autoplay: false,
              loop: false,
              controls: true,
              preload: "metadata",
            },
          },
          "gatsby-remark-prismjs",
        ],
      },
    },

    "gatsby-plugin-catch-links",
    {
      resolve: "gatsby-plugin-google-analytics",
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
                  description: node.childMdx.excerpt,
                  date: node.date,
                  url: site.siteMetadata.siteUrl + node.slug,
                  guid: site.siteMetadata.siteUrl + node.slug,
                  custom_elements: [{"content:encoded": node.childMdx.html}],
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
                    slug
                    name
                    date
                    childMdx {
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
      resolve: "gatsby-plugin-nprogress",
      options: {
        color: colors.primary,
      },
    },
  ],
}
