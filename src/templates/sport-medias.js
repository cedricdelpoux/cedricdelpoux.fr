import {graphql} from "gatsby"
import React from "react"

import {LayoutPage} from "../layouts/page"
import {Masonry} from "../components/masonry"
import {PaperPhoto} from "../components/paper-photo"
import {PaperVideo} from "../components/paper-video"

export default ({
  data: {
    googleDocs: {
      name: title,
      childMarkdownRemark: {html, excerpt},
    },
    album,
    videos,
  },
}) => {
  return (
    <LayoutPage title={title} description={excerpt} html={html}>
      <Masonry>
        {videos.nodes.map((node) => (
          <PaperVideo key={node.id} {...node} />
        ))}
        {album.photos.map((node) => (
          <PaperPhoto
            key={node.id}
            photo={node.photo}
            alt={`Sport photo ${node.id}`}
          />
        ))}
      </Masonry>
    </LayoutPage>
  )
}

export const pageQuery = graphql`
  query SportMedias($path: String!) {
    googleDocs(fields: {slug: {eq: $path}}) {
      name
      childMarkdownRemark {
        html
        excerpt
      }
    }
    videos: allYoutubeVideo(filter: {tags: {in: "sport"}}) {
      nodes {
        id
        ...PaperVideoFragment
      }
    }
    album: googlePhotosAlbum(category: {eq: "sport"}) {
      photos {
        id
        photo {
          childImageSharp {
            fluid(maxWidth: 1024) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`
