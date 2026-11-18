import {graphql} from "gatsby"
import React from "react"

import {LayoutPage} from "../layouts/page"

const Page = ({
  data: {
    mdx: {
      frontmatter: {name: title},
    },
  },
  children,
}) => {
  return <LayoutPage title={title} body={children} />
}

export default Page

export {MdxHead as Head} from "../components/seo"

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
