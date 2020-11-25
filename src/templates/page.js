import {graphql} from "gatsby"
import React from "react"

import {LayoutPage} from "../layouts/page"

export default ({
  data: {
    googleDocs: {
      name: title,
      childMarkdownRemark: {html, excerpt},
    },
  },
}) => {
  return <LayoutPage title={title} description={excerpt} html={html} />
}

export const pageQuery = graphql`
  query PageBySlug($path: String!) {
    googleDocs(fields: {slug: {eq: $path}}) {
      name
      childMarkdownRemark {
        html
        excerpt
      }
    }
  }
`
