import {graphql} from "gatsby"
import React from "react"

import {Flag} from "../components/flag"
import {Html} from "../components/html"
import {Masonry} from "../components/masonry"
import {PaperCountry} from "../components/paper-country"
import {PaperPhoto} from "../components/paper-photo"
import {PaperPost} from "../components/paper-post"
import {PaperStory} from "../components/paper-story"
import {PaperVideo} from "../components/paper-video"
import {LayoutPage} from "../layouts/page"

const TravelCountry = ({
  pageContext: {country},
  data: {
    googleDocs: {
      name: title,
      childMdx: {body, excerpt},
    },
    regions,
    story,
    posts,
    album,
    videos,
  },
}) => {
  return (
    <LayoutPage title={title} description={excerpt}>
      <Flag country={country} css={{alignSelf: "center"}} />
      <Html body={body} />
      <Masonry>
        {story && <PaperStory key={story.slug} {...story} />}
        {regions.nodes.length > 0 &&
          regions.nodes.map((node) => (
            <PaperCountry key={node.id} {...node} country={node.region} />
          ))}
        {videos &&
          videos.nodes.length > 0 &&
          videos.nodes
            .filter((node) => !node.region)
            .map((node) => <PaperVideo key={node.id} {...node} />)}
        {album?.photos &&
          album.photos.length > 0 &&
          album.photos.map((node) => (
            <PaperPhoto
              key={node.id}
              photo={node.file}
              alt={`${country} photo ${node.id}`}
            />
          ))}
        {posts &&
          posts.nodes.length > 0 &&
          posts.nodes.map((node) => <PaperPost key={node.slug} post={node} />)}
      </Masonry>
    </LayoutPage>
  )
}

export default TravelCountry

export const pageQuery = graphql`
  query TravelCountry($path: String!, $country: String!, $locale: String!) {
    googleDocs(slug: {eq: $path}) {
      name
      childMdx {
        body
        excerpt
      }
    }
    regions: allGoogleDocs(
      filter: {
        locale: {eq: $locale}
        country: {eq: $country}
        region: {ne: null}
      }
      sort: {fields: album___latestDate, order: DESC}
    ) {
      nodes {
        id
        region
        ...PaperCountryFragment
      }
    }
    videos: allYoutubeVideo(
      filter: {country: {eq: $country}}
      sort: {fields: statistics___viewCount, order: DESC}
    ) {
      nodes {
        id
        region
        ...PaperVideoFragment
      }
    }
    story: googleDocs(
      locale: {eq: $locale}
      country: {eq: $country}
      template: {eq: "travel-story"}
    ) {
      ...PaperStoryFragment
    }
    posts: allGoogleDocs(
      sort: {fields: [date], order: DESC}
      filter: {
        locale: {eq: $locale}
        country: {eq: $country}
        region: {eq: null}
        template: {eq: "post"}
      }
    ) {
      nodes {
        slug
        ...PaperPostFragment
      }
    }
    album: googlePhotosAlbum(country: {eq: $country}, region: {eq: null}) {
      photos {
        id
        file {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
          }
        }
      }
    }
  }
`
