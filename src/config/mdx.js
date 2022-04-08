exports.mdxOptions = {
  gatsbyRemarkPlugins: [
    "gatsby-remark-unwrap-images",
    "gatsby-remark-copy-linked-files",
    "gatsby-remark-images-medium-zoom",
    {
      resolve: "gatsby-remark-strava",
      options: {
        debug: process.env.DEBUG,
        stravaClientId: process.env.STRAVA_CLIENT_ID,
        stravaClientSecret: process.env.STRAVA_CLIENT_SECRET,
        stravaToken: process.env.STRAVA_TOKEN,
      },
    },
    {
      resolve: "gatsby-remark-youtube",
      options: {
        debug: process.env.DEBUG,
      },
    },
    {
      resolve: "gatsby-remark-images",
      options: {
        showCaptions: true,
        maxWidth: 680,
        linkImagesToOriginal: false,
        wrapperStyle: "overflow:hidden; width:100%;",
      },
    },
    // {
    //   resolve: "gatsby-remark-gifs-to-videos",
    //   options: {
    //     autoplay: false,
    //     loop: false,
    //     controls: true,
    //     preload: "metadata",
    //   },
    // },
    "gatsby-remark-prismjs",
  ],
}
