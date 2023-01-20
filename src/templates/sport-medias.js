import {faStrava} from "@fortawesome/free-brands-svg-icons"
import {graphql} from "gatsby"
import React from "react"
import {useMemo} from "react"

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
  const masonryItems = useMemo(() => {
    const videosItems = videos.nodes.map((node) => ({
      type: "video",
      date: new Date(node.recordingDetails.recordingDate),
      node,
    }))
    const photosItems = album?.photos.map((node) => ({
      type: "photo",
      date: new Date(node.mediaMetadata.creationTime),
      node,
    }))
    return [...photosItems, ...videosItems].sort((a, b) => b.date - a.date)
  }, [album, videos])
  return (
    <LayoutPage
      title={title}
      description={excerpt}
      body={body}
      css={{maxWidth: "100%"}}
    >
      <Masonry maxColumnsCount={4}>
        {masonryItems.map(({type, node}) => {
          switch (type) {
            case "photo":
              return (
                <PaperPhoto
                  key={node.id}
                  photo={node.file}
                  alt={node.description || `Sport photo ${node.id}`}
                  to={
                    node.stravaID
                      ? getStravaActivityUrl(node.stravaID)
                      : undefined
                  }
                  icon={node.stravaID && faStrava}
                />
              )
            case "video":
              return <PaperVideo key={node.id} {...node} />
          }
        })}
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
        recordingDetails {
          recordingDate
        }
        ...PaperVideoFragment
      }
    }
    album: googlePhotosAlbum(category: {eq: "sport"}) {
      photos {
        ...PaperPhotoFragment
        mediaMetadata {
          creationTime
        }
        stravaID
      }
    }
  }
`
