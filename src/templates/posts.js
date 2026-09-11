import {graphql} from "gatsby"
import React from "react"

import {Grid} from "../components/grid"
import {PaperPost} from "../components/paper-post"
import {LayoutPage} from "../layouts/page"

const Posts = ({
  data: {
    mdx: {
      excerpt,
      frontmatter: {name: title},
    },
    posts,
  },
  children,
}) => {
  const sortedPosts = posts.nodes.sort((a, b) =>
    b.frontmatter.dateUS.localeCompare(a.frontmatter.dateUS)
  )
  return (
    <LayoutPage title={title} description={excerpt} body={children}>
      {sortedPosts && sortedPosts.length > 0 && (
        <Grid>
          {sortedPosts.map((post) => (
            <PaperPost key={post.id} post={post} />
          ))}
        </Grid>
      )}
    </LayoutPage>
  )
}

export default Posts

export const pageQuery = graphql`
  query Posts($slug: String!, $locale: String!, $category: String) {
    mdx(frontmatter: {slug: {eq: $slug}}) {
      excerpt
      frontmatter {
        name
      }
    }
    posts: allMdx(
      sort: {frontmatter: {date: DESC}}
      filter: {
        frontmatter: {
          template: {eq: "post"}
          locale: {eq: $locale}
          category: {eq: $category}
        }
      }
    ) {
      nodes {
        id
        frontmatter {
          dateUS: date(formatString: "YYYY-MM-DD")
        }
        ...PaperPostFragment
      }
    }
  }
`
