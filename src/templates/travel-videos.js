import {graphql} from "gatsby"
import React from "react"

import {Masonry} from "../components/masonry"
import {PaperVideo} from "../components/paper-video"
import {LayoutPage} from "../layouts/page"

const TravelVideos = ({
  data: {
    videos,
    mdx: {
      frontmatter: {name: title},
    },
  },
  children,
}) => {
  return (
    <LayoutPage title={title} body={children}>
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

export default TravelVideos

export {MdxHead as Head} from "../components/seo"

export const pageQuery = graphql`
  query TravelVideos($slug: String!) {
    mdx(frontmatter: {slug: {eq: $slug}}) {
      excerpt
      frontmatter {
        name
      }
    }
    videos: allYoutubeVideo(
      filter: {tags: {in: "travel"}}
      sort: {statistics: {viewCount: DESC}}
    ) {
      nodes {
        id
        ...PaperVideoFragment
      }
    }
  }
`
