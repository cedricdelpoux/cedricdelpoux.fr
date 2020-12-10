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
  query Page($path: String!) {
    googleDocs(slug: {eq: $path}) {
      name
      childMarkdownRemark {
        html
        excerpt
      }
    }
  }
`
