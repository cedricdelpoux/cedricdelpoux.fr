import {graphql} from "gatsby"
import React from "react"

import {Flag} from "../components/flag"
import {Html} from "../components/html"
import {LayoutPage} from "../layouts/page"
import {Masonry} from "../components/masonry"
import {PaperCountry} from "../components/paper-country"
import {PaperPhoto} from "../components/paper-photo"
import {PaperPost} from "../components/paper-post"
import {PaperVideo} from "../components/paper-video"
import {PaperStory} from "../components/paper-story"

export default ({
  pageContext: {country},
  data: {
    googleDocs: {
      name: title,
      childMarkdownRemark: {html, excerpt},
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
      <Html html={html} />
      <Masonry>
        {story && <PaperStory key={story.fields.slug} {...story} />}
        {regions.nodes.length > 0 &&
          regions.nodes.map(({region, fields: {slug}, ...rest}) => (
            <PaperCountry key={region} to={slug} country={region} {...rest} />
          ))}
        {videos &&
          videos.nodes.length > 0 &&
          videos.nodes
            .filter((node) => !node.region)
            .map((node) => <PaperVideo key={node.id} {...node} />)}
        {album &&
          album.photos.length > 0 &&
          album.photos.map((node) => (
            <PaperPhoto
              key={node.id}
              photo={node.photo}
              alt={`${country} photo ${node.id}`}
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
  query Country($path: String!, $country: String!, $locale: String!) {
    googleDocs(fields: {slug: {eq: $path}}) {
      name
      childMarkdownRemark {
        html
        excerpt
      }
    }
    regions: allGoogleDocs(
      filter: {
        locale: {eq: $locale}
        country: {eq: $country}
        region: {ne: null}
      }
    ) {
      nodes {
        region
        fields {
          slug
        }
        ...PaperCountryFragment
      }
    }
    videos: allYoutubeVideo(filter: {country: {eq: $country}}) {
      nodes {
        id
        region
        ...YoutubeVideoFragment
      }
    }
    story: googleDocs(
      locale: {eq: $locale}
      country: {eq: $country}
      template: {eq: "travel-story"}
    ) {
      ...PaperStory
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
        fields {
          slug
        }
        ...PaperPostNodeFragment
      }
    }
    album: googlePhotosAlbum(country: {eq: $country}, region: {eq: null}) {
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
