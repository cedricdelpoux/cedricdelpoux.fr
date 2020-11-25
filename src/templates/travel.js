import {graphql} from "gatsby"
import React from "react"

import {AnimationTravel} from "../components/animation-travel"
import {Html} from "../components/html"
import {View} from "../components/view"
import {LayoutPage} from "../layouts/page"

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
      <View css={{alignSelf: "center"}}>
        <AnimationTravel />
      </View>
      <Html html={html} />
    </LayoutPage>
  )
}

export const pageQuery = graphql`
  query Travel($path: String!) {
    googleDocs(fields: {slug: {eq: $path}}) {
      name
      childMarkdownRemark {
        html
        excerpt
      }
    }
  }
`
