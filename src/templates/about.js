import {graphql} from "gatsby"
import React from "react"

import {Avatar} from "../components/avatar"
import {Html} from "../components/html"
import {View} from "../components/view"
import {LayoutPage} from "../layouts/page"

export default ({
  data: {
    googleDocs: {
      name: title,
      childMdx: {body, excerpt},
    },
  },
}) => {
  return (
    <LayoutPage title={title} description={excerpt}>
      <View css={{alignItems: "center"}}>
        <Avatar />
      </View>
      <Html body={body} />
    </LayoutPage>
  )
}

export const pageQuery = graphql`
  query About($path: String!) {
    googleDocs(slug: {eq: $path}) {
      name
      childMdx {
        body
        excerpt
      }
    }
  }
`
