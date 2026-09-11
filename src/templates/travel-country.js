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
    mdx: {
      excerpt,
      frontmatter: {name: title},
    },
    regions,
    story,
    posts,
    photos,
    videos,
  },
  children,
}) => {
  return (
    <LayoutPage title={title} description={excerpt}>
      <Flag country={country} css={{alignSelf: "center"}} />
      <Html body={children} />
      <Masonry>
        {story && <PaperStory key={story.frontmatter.slug} {...story} />}
        {regions.nodes.length > 0 &&
          regions.nodes.map((node) => (
            <PaperCountry
              key={node.id}
              {...node}
              frontmatter={{
                ...node.frontmatter,
                country: node.frontmatter.region,
              }}
            />
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
          posts.nodes.map((node) => (
            <PaperPost key={node.frontmatter.slug} post={node} />
          ))}
      </Masonry>
    </LayoutPage>
  )
}

export default TravelCountry

export const pageQuery = graphql`
  query TravelCountry($slug: String!, $country: String!, $locale: String!) {
    mdx(frontmatter: {slug: {eq: $slug}}) {
      excerpt
      frontmatter {
        name
      }
    }
    regions: allMdx(
      filter: {
        frontmatter: {
          locale: {eq: $locale}
          country: {eq: $country}
          region: {ne: null}
        }
      }
      sort: {fields: {lastVisitDate: DESC}}
    ) {
      nodes {
        id
        frontmatter {
          region
        }
        ...PaperCountryFragment
      }
    }
    videos: allYoutubeVideo(
      filter: {country: {eq: $country}}
      sort: {statistics: {viewCount: DESC}}
    ) {
      nodes {
        id
        region
        ...PaperVideoFragment
      }
    }
    story: mdx(
      frontmatter: {
        locale: {eq: $locale}
        country: {eq: $country}
        template: {eq: "travel-story"}
      }
    ) {
      ...PaperStoryFragment
    }
    posts: allMdx(
      sort: {frontmatter: {date: DESC}}
      filter: {
        frontmatter: {
          locale: {eq: $locale}
          country: {eq: $country}
          region: {eq: null}
          template: {eq: "post"}
        }
      }
    ) {
      nodes {
        id
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
