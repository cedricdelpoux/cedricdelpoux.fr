import {graphql} from "gatsby"
import React from "react"

import {Grid} from "../components/grid"
import {PaperVideo} from "../components/paper-video"
import {LayoutPage} from "../layouts/page"

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
      <Grid>
        {videos.nodes
          .filter((node) => !node.region)
          .map((node) => (
            <PaperVideo key={node.id} {...node} />
          ))}
      </Grid>
    </LayoutPage>
  )
}

export const pageQuery = graphql`
  query TravelVideos($path: String!) {
    googleDocs(slug: {eq: $path}) {
      name
      childMarkdownRemark {
        html
        excerpt
      }
    }
    videos: allYoutubeVideo(
      filter: {tags: {in: "travel"}}
      sort: {fields: statistics___viewCount, order: DESC}
    ) {
      nodes {
        id
        ...PaperVideoFragment
      }
    }
  }
`
