import {faStrava} from "@fortawesome/free-brands-svg-icons"
import {graphql} from "gatsby"
import React from "react"

import {Masonry} from "../components/masonry"
import {PaperPhoto} from "../components/paper-photo"
import {PaperVideo} from "../components/paper-video"
import {LayoutPage} from "../layouts/page"
import {getStravaActivityUrl} from "../utils/strava"

const SportMedias = ({
  data: {
    googleDocs: {
      name: title,
      childMdx: {body, excerpt},
    },
    album,
    videos,
  },
}) => {
  return (
    <LayoutPage title={title} description={excerpt} body={body}>
      <Masonry>
        {videos.nodes.map((node) => (
          <PaperVideo key={node.id} {...node} />
        ))}
        {album?.photos &&
          album.photos.map((node) => (
            <PaperPhoto
              key={node.id}
              photo={node.file}
              alt={node.description || `Sport photo ${node.id}`}
              to={
                node.stravaID ? getStravaActivityUrl(node.stravaID) : undefined
              }
              icon={node.stravaID && faStrava}
            />
          ))}
      </Masonry>
    </LayoutPage>
  )
}

export default SportMedias

export const pageQuery = graphql`
  query SportMedias($path: String!) {
    googleDocs(slug: {eq: $path}) {
      name
      childMdx {
        body
        excerpt
      }
    }
    videos: allYoutubeVideo(
      filter: {tags: {in: "sport"}}
      sort: {fields: statistics___viewCount, order: DESC}
    ) {
      nodes {
        id
        ...PaperVideoFragment
      }
    }
    album: googlePhotosAlbum(category: {eq: "sport"}) {
      photos {
        ...PaperPhotoFragment
        stravaID
      }
    }
  }
`
