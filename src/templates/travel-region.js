import {Flag} from "../components/flag"
import {LayoutPage} from "../layouts/page"
import {Masonry} from "../components/masonry"
import {PaperPhoto} from "../components/paper-photo"
import {PaperPost} from "../components/paper-post"
import {PaperStory} from "../components/paper-story"
import {PaperVideo} from "../components/paper-video"
import React from "react"
import {graphql} from "gatsby"

const TravelRegion = ({
  pageContext: {country, region},
  data: {
    mdx: {
      excerpt,
      frontmatter: {name: title},
    },
    photos,
    posts,
    story,
    videos,
  },
  children,
}) => {
  return (
    <LayoutPage title={title} description={excerpt} body={children}>
      <Flag country={country} css={{alignSelf: "center"}} />
      <Masonry>
        {story && <PaperStory key={story.frontmatter.slug} {...story} />}
        {videos &&
          videos.nodes.length > 0 &&
          videos.nodes.map((node) => <PaperVideo key={node.id} {...node} />)}
        {photos?.nodes &&
          photos.nodes.length > 0 &&
          photos.nodes.map((node) => (
            <PaperPhoto
              key={node.id}
              photo={node}
              alt={`${region} photo ${node.id}`}
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

export default TravelRegion

export const pageQuery = graphql`
  query TravelRegion(
    $slug: String!
    $country: String!
    $region: String!
    $locale: String!
  ) {
    mdx(frontmatter: {slug: {eq: $slug}}) {
      excerpt
      frontmatter {
        name
      }
    }
    posts: allMdx(
      sort: {frontmatter: {date: DESC}}
      filter: {
        frontmatter: {
          locale: {eq: $locale}
          country: {eq: $country}
          region: {eq: $region}
          template: {eq: "post"}
        }
      }
    ) {
      nodes {
        id
        ...PaperPostFragment
      }
    }
    story: mdx(
      frontmatter: {
        locale: {eq: $locale}
        country: {eq: $region}
        template: {eq: "travel-story"}
      }
    ) {
      ...PaperStoryFragment
    }
    videos: allYoutubeVideo(
      filter: {tags: {in: [$region]}}
      sort: {statistics: {viewCount: DESC}}
    ) {
      nodes {
        id
        ...PaperVideoFragment
      }
    }
    photos: allCloudinaryMedia(
      filter: {
        fields: {
          category: {eq: "travel"}
          country: {eq: $country}
          region: {eq: $region}
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
