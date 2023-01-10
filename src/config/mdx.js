exports.mdxOptions = {
  gatsbyRemarkPlugins: [
    "gatsby-remark-unwrap-images",
    "gatsby-remark-copy-linked-files",
    "gatsby-remark-images-medium-zoom",
    {
      resolve: "gatsby-remark-strava",
      options: {
        debug: process.env.STRAVA_DEBUG,
        stravaClientId: process.env.STRAVA_CLIENT_ID,
        stravaClientSecret: process.env.STRAVA_CLIENT_SECRET,
        stravaToken: process.env.STRAVA_TOKEN,
        render: (activity) => {
          const startDate = new Date(activity.start_date)
          const startDateLocalized = startDate.toLocaleDateString("fr-fr", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
          const photo = activity?.photos?.primary?.urls["600"] || null

          // Don't work in PascalCase <Strava />
          return `
            <strava
              id="${activity.id}"
              average_speed="${activity.average_speed}"
              calories="${activity.calories}"
              comment_count="${activity.comment_count}"
              comment_count="${activity.comment_count}"
              distance="${activity.distance}"
              elapsed_time="${activity.elapsed_time}"
              kudos_count="${activity.kudos_count}"
              moving_time="${activity.moving_time}"
              name="${activity.name}"
              photo="${photo}"
              photo_count="${activity.photo_count}"
              polyline="${activity.map?.summary_polyline}"
              start_date="${startDateLocalized}"
              suffer_score="${activity.suffer_score}"
              total_elevation_gain="${activity.total_elevation_gain}"
              type="${activity.type}"
            />
          `
        },
      },
    },
    {
      resolve: "gatsby-remark-youtube",
      options: {
        debug: process.env.YOUTUBE_DEBUG,
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
