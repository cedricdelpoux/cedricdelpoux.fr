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
        const sortedPosts = posts.nodes.sort((a, b) =>
          b.dateUS.localeCompare(a.dateUS)
        )
        return sortedPosts.map((node) => {
          return {
            title: node.name,
            description: node.childMdx.excerpt,
            date: node.dateISO,
            url: site.siteMetadata.siteUrl + node.slug,
            custom_elements: [
              {
                "content:encoded": node.childMdx.html,
              },
            ],
          }
        })
      },
      query: `
          {
            posts: allGoogleDocs(
              filter: {
                template: {eq: "post"}
              }
            ) {
              nodes {
                slug
                name
                dateUS: date(formatString: "YYYY-MM-DD")
                dateISO: date
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
      description:
        "Site de Cédric Delpoux: sport, programmation, voyages et bien plus...",
      feed_url: "https://cedricdelpoux.fr/rss.xml",
      site_url: "https://cedricdelpoux.fr",
      image_url: "https://cedricdelpoux.fr/favicon.svg",
      language: "fr",
    },
  ],
}
