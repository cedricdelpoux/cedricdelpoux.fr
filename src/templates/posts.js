import {graphql} from "gatsby"
import React from "react"

import {Grid} from "../components/grid"
import {PaperPost} from "../components/paper-post"
import {LayoutPage} from "../layouts/page"

const Posts = ({
  data: {
    googleDocs: {
      name: title,
      childMdx: {body, excerpt},
    },
    posts,
  },
}) => {
  return (
    <LayoutPage title={title} description={excerpt} body={body}>
      {posts && posts.nodes.length > 0 && (
        <Grid>
          {posts.nodes.map((post) => (
            <PaperPost key={post.slug} post={post} />
          ))}
        </Grid>
      )}
    </LayoutPage>
  )
}

export default Posts

export const pageQuery = graphql`
  query Posts($path: String!, $locale: String!, $category: String) {
    googleDocs(slug: {eq: $path}) {
      name
      childMdx {
        body
        excerpt
      }
    }
    posts: allGoogleDocs(
      sort: {fields: date, order: DESC}
      filter: {
        template: {eq: "post"}
        locale: {eq: $locale}
        category: {eq: $category}
      }
    ) {
      nodes {
        slug
        ...PaperPostFragment
      }
    }
  }
`
