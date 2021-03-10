import {graphql} from "gatsby"
import React from "react"

import {LayoutPage} from "../layouts/page"

const Page = ({
  data: {
    googleDocs: {
      name: title,
      childMdx: {body, excerpt},
    },
  },
}) => {
  return <LayoutPage title={title} description={excerpt} body={body} />
}

export default Page

export const pageQuery = graphql`
  query Page($path: String!) {
    googleDocs(slug: {eq: $path}) {
      name
      childMdx {
        body
        excerpt
      }
    }
  }
`
