import {Flag} from "../components/flag"
import {Html} from "../components/html"
import {LayoutPage} from "../layouts/page"
import {Masonry} from "../components/masonry"
import {PaperCountry} from "../components/paper-country"
import {PaperPhoto} from "../components/paper-photo"
import {PaperPost} from "../components/paper-post"
import {PaperStory} from "../components/paper-story"
import {PaperVideo} from "../components/paper-video"
import React from "react"
import {graphql} from "gatsby"

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
    photos,
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
        {photos?.nodes &&
          photos.nodes.length > 0 &&
          photos.nodes.map((node) => (
            <PaperPhoto
              key={node.id}
              photo={node}
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
      sort: {fields: fields___lastVisitDate, order: DESC}
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
    photos: allCloudinaryMedia(
      filter: {
        fields: {
          category: {eq: "travel"}
          country: {eq: $country}
          region: {eq: null}
        }
      }
    ) {
      nodes {
        id
        ...PaperPhotoFragment
      }
    }
  }
`
