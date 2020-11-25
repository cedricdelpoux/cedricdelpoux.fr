import {FormattedMessage} from "react-intl"
import {graphql} from "gatsby"
import React from "react"

import {LayoutPage} from "../layouts/page"
import {Masonry} from "../components/masonry"
import {Paper} from "../components/paper"
import {PaperPost} from "../components/paper-post"

export default ({
  data: {
    googleDocs: {
      name: title,
      childMarkdownRemark: {html, excerpt},
    },
    posts,
  },
  pageContext,
}) => {
  return (
    <LayoutPage title={title} description={excerpt} html={html}>
      {posts && posts.nodes.length > 0 ? (
        <Masonry>
          {posts.nodes.map((post) => (
            <PaperPost key={post.fields.slug} post={post} />
          ))}
        </Masonry>
      ) : (
        <Paper>
          <FormattedMessage
            id="pages.posts.empty"
            values={{locale: pageContext.locale}}
          />
        </Paper>
      )}
    </LayoutPage>
  )
}

export const pageQuery = graphql`
  query Posts($path: String!, $locale: String!, $category: String) {
    googleDocs(fields: {slug: {eq: $path}}) {
      name
      childMarkdownRemark {
        html
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
        fields {
          slug
        }
        ...PaperPostNodeFragment
      }
    }
  }
`
