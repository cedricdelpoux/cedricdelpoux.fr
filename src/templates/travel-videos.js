import {graphql} from "gatsby"
import React from "react"

import {LayoutPage} from "../layouts/page"
import {Masonry} from "../components/masonry"
import {PaperVideo} from "../components/paper-video"

export default ({
  data: {
    videos,
    googleDocs: {
      name: title,
      childMarkdownRemark: {html, excerpt},
    },
  },
}) => {
  return (
    <LayoutPage title={title} description={excerpt} html={html}>
      <Masonry>
        {videos.nodes
          .filter((node) => !node.region)
          .map((node) => (
            <PaperVideo key={node.id} {...node} />
          ))}
      </Masonry>
    </LayoutPage>
  )
}

export const pageQuery = graphql`
  query TravelVideos($path: String!) {
    googleDocs(fields: {slug: {eq: $path}}) {
      name
      childMarkdownRemark {
        html
        excerpt
      }
    }
    videos: allYoutubeVideo(filter: {tags: {in: "travel"}}) {
      nodes {
        id
        ...YoutubeVideoFragment
      }
    }
  }
`
