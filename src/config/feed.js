exports.feedOptions = {
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
}
