import {FormattedMessage} from "react-intl"
import {graphql} from "gatsby"
import React from "react"

import {LayoutPage} from "../layouts/page"
import {Masonry} from "../components/masonry"
import {PaperPhoto} from "../components/paper-photo"
import {PaperVideo} from "../components/paper-video"
import {Title} from "../components/title"

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
      {album?.photos?.length > 0 && (
        <>
          <Title as="h2">
            <FormattedMessage id="pages.sport.medias.photos" />
          </Title>
          <Masonry>
            {album.photos.map((node) => (
              <PaperPhoto
                key={node.id}
                photo={node.photo}
                alt={`Sport photo ${node.id}`}
              />
            ))}
          </Masonry>
        </>
      )}
      {videos?.nodes?.length > 0 && (
        <>
          <Title as="h2">
            <FormattedMessage id="pages.sport.medias.videos" />
          </Title>
          <Masonry>
            {videos.nodes.map((node) => (
              <PaperVideo key={node.id} {...node} />
            ))}
          </Masonry>
        </>
      )}
    </LayoutPage>
  )
}

export const pageQuery = graphql`
  query SportMedia($path: String!) {
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
        ...YoutubeVideoFragment
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
