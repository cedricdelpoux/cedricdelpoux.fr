import {graphql} from "gatsby"
import React from "react"

import {Flag} from "../components/flag"
import {LayoutPage} from "../layouts/page"
import {Masonry} from "../components/masonry"
import {PaperPhoto} from "../components/paper-photo"
import {PaperPost} from "../components/paper-post"
import {PaperVideo} from "../components/paper-video"
import {PaperStory} from "../components/paper-story"

export default ({
  pageContext: {country, region},
  data: {
    googleDocs: {
      name: title,
      childMarkdownRemark: {html, excerpt},
    },
    album,
    posts,
    story,
    videos,
  },
}) => {
  return (
    <LayoutPage title={title} description={excerpt} html={html}>
      <Flag country={country} css={{alignSelf: "center"}} />
      <Masonry>
        {story && <PaperStory key={story.fields.slug} {...story} />}
        {videos &&
          videos.nodes.length > 0 &&
          videos.nodes.map((node) => <PaperVideo key={node.id} {...node} />)}
        {album &&
          album.photos.length > 0 &&
          album.photos.map((node) => (
            <PaperPhoto
              key={node.id}
              photo={node.photo}
              alt={`${region} photo ${node.id}`}
            />
          ))}
        {posts &&
          posts.nodes.length > 0 &&
          posts.nodes.map((node) => (
            <PaperPost key={node.fields.slug} post={node} />
          ))}
      </Masonry>
    </LayoutPage>
  )
}

export const pageQuery = graphql`
  query TravelRegion(
    $path: String!
    $country: String!
    $region: String!
    $locale: String!
  ) {
    googleDocs(fields: {slug: {eq: $path}}) {
      name
      childMarkdownRemark {
        html
        excerpt
      }
    }
    posts: allGoogleDocs(
      sort: {fields: [date], order: DESC}
      filter: {
        locale: {eq: $locale}
        country: {eq: $country}
        region: {eq: $region}
        template: {eq: "post"}
      }
    ) {
      nodes {
        fields {
          slug
        }
        ...PaperPostFragment
      }
    }
    story: googleDocs(
      locale: {eq: $locale}
      country: {eq: $region}
      template: {eq: "travel-story"}
    ) {
      ...PaperStoryFragment
    }
    videos: allYoutubeVideo(
      filter: {tags: {in: [$region]}}
      sort: {fields: statistics___viewCount, order: DESC}
    ) {
      nodes {
        id
        ...PaperVideoFragment
      }
    }
    album: googlePhotosAlbum(country: {eq: $country}, region: {eq: $region}) {
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
