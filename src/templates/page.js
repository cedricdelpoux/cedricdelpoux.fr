import {graphql} from "gatsby"
import React from "react"

import {LayoutPage} from "../layouts/page"

const Page = ({
  data: {
    mdx: {
      excerpt,
      frontmatter: {name: title},
    },
  },
  children,
}) => {
  return <LayoutPage title={title} description={excerpt} body={children} />
}

export default Page

export const pageQuery = graphql`
  query Page($slug: String!) {
    mdx(frontmatter: {slug: {eq: $slug}}) {
      excerpt
      frontmatter {
        name
      }
    }
  }
`
