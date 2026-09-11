const {siteConfig} = require("./site.js")

exports.feedOptions = {
  feeds: [
    {
      query: `
        {
          posts: allMdx(
            filter: {
              frontmatter: {template: {eq: "post"}}
            }
          ) {
            nodes {
              excerpt(pruneLength: 1000)
              frontmatter {
                slug
                name
                dateUS: date(formatString: "YYYY-MM-DD")
                dateISO: date
              }
            }
          }
        }
      `,
      serialize: ({query: {posts}}) => {
        const sortedPosts = posts.nodes.sort((a, b) =>
          b.frontmatter.dateUS.localeCompare(a.frontmatter.dateUS)
        )
        return sortedPosts.map((node) => {
          return {
            title: node.frontmatter.name,
            description: node.excerpt,
            date: node.frontmatter.dateISO,
            url: siteConfig.url + node.frontmatter.slug,
            custom_elements: [
              {
                // `html` was removed from the `Mdx` type in
                // gatsby-plugin-mdx v4, an MDX document has no plain-HTML
                // rendering available at query time any more
                "content:encoded": node.excerpt,
              },
            ],
          }
        })
      },
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
