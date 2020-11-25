import {FormattedMessage} from "react-intl"
import {graphql} from "gatsby"
import React from "react"

import {Flag} from "../components/flag"
import {LayoutPage} from "../layouts/page"
import {Masonry} from "../components/masonry"
import {PaperPhoto} from "../components/paper-photo"
import {PaperVideo} from "../components/paper-video"
import {Title} from "../components/title"

export default ({
  pageContext: {country, region},
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
      <Flag country={country} css={{alignSelf: "center"}} />
      {videos && videos.nodes.length > 0 && (
        <>
          <Title as="h2">
            <FormattedMessage id="pages.country.videos" />
          </Title>
          <Masonry>
            {videos.nodes.map((node) => (
              <PaperVideo key={node.id} {...node} />
            ))}
          </Masonry>
        </>
      )}
      <Title as="h2">
        <FormattedMessage id="pages.country.photos" />
      </Title>
      {album && (
        <Masonry>
          {album.photos.map((node) => (
            <PaperPhoto key={node.id} photo={node.photo} alt={region} />
          ))}
        </Masonry>
      )}
    </LayoutPage>
  )
}

export const pageQuery = graphql`
  query CountryRegion($path: String!, $country: String!, $region: String!) {
    googleDocs(fields: {slug: {eq: $path}}) {
      name
      childMarkdownRemark {
        html
        excerpt
      }
    }
    videos: allYoutubeVideo(filter: {tags: {in: [$region]}}) {
      nodes {
        id
        ...YoutubeVideoFragment
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
