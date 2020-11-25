import {graphql} from "gatsby"
import React from "react"

import {CedricCircle} from "../components/cedric-circle"
import {Html} from "../components/html"
import {LayoutPage} from "../layouts/page"
import {View} from "../components/view"

export default ({
  data: {
    googleDocs: {
      name: title,
      childMarkdownRemark: {html, excerpt},
    },
  },
}) => {
  return (
    <LayoutPage title={title} description={excerpt}>
      <View css={{alignItems: "center"}}>
        <CedricCircle />
      </View>
      <Html html={html} />
    </LayoutPage>
  )
}

export const pageQuery = graphql`
  query About($path: String!) {
    googleDocs(fields: {slug: {eq: $path}}) {
      name
      childMarkdownRemark {
        html
        excerpt
      }
    }
  }
`
