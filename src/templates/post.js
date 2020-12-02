import {FormattedMessage} from "react-intl"
import {Helmet} from "react-helmet"
import {faCalendarDay, faHourglassHalf} from "@fortawesome/pro-light-svg-icons"
import {graphql} from "gatsby"
import React from "react"
import Loadable from "@loadable/component"

import {Html} from "../components/html"
import {LayoutPage} from "../layouts/page"
import {Title} from "../components/title"
import {View} from "../components/view"

const ReactDisqusComments = Loadable(() => import("react-disqus-comments"))
const {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  PocketShareButton,
  PocketIcon,
} = Loadable(() => import("react-share"))

export default ({
  data: {
    googleDocs: {
      date,
      name: title,
      cover,
      fields: {slug},
      childMarkdownRemark: {excerpt, timeToRead, html},
    },
    site: {siteMetadata},
  },
  location,
}) => {
  const absoluteUrl = siteMetadata.siteUrl + slug
  return (
    <LayoutPage
      title={title}
      description={excerpt}
      metadata={[
        {icon: faCalendarDay, label: date},
        {icon: faHourglassHalf, label: `${timeToRead} min`},
      ]}
      cover={cover}
    >
      <Helmet>
        <meta property="og:type" content="article" />
      </Helmet>
      {/*<Toc tableOfContents={tableOfContents} />*/}
      <Html html={html} />
      <Title
        css={{
          fontSize: {
            _: 4,
            s: 6,
          },
        }}
      >
        <FormattedMessage id="post.shares" />
      </Title>
      <View
        css={{
          flexDirection: "row",
          justifyContent: "center",
          gap: 1,
          "& > *": {
            cursor: "pointer",
          },
        }}
      >
        <EmailShareButton url={absoluteUrl}>
          <EmailIcon size={48} round />
        </EmailShareButton>
        <WhatsappShareButton url={absoluteUrl}>
          <WhatsappIcon size={48} round />
        </WhatsappShareButton>
        <PocketShareButton title={title}>
          <PocketIcon size={48} round />
        </PocketShareButton>
        <FacebookShareButton url={absoluteUrl} quote={excerpt}>
          <FacebookIcon size={48} round />
        </FacebookShareButton>
        <TwitterShareButton url={absoluteUrl} title={title}>
          <TwitterIcon size={48} round />
        </TwitterShareButton>
      </View>
      <Title
        css={{
          fontSize: {
            _: 4,
            s: 6,
          },
        }}
      >
        <FormattedMessage id="post.comments" />
      </Title>
      {location && (
        <ReactDisqusComments
          shortname="cedricdelpoux"
          identifier={location.pathname}
          url={`${siteMetadata.siteUrl}${location.pathname}`}
          title={title}
          language="fr"
        />
      )}
    </LayoutPage>
  )
}

export const pageQuery = graphql`
  query Post($path: String!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    googleDocs(fields: {slug: {eq: $path}}) {
      name
      date(formatString: "Do MMMM YYYY", locale: "fr")
      cover {
        image {
          childImageSharp {
            fixed {
              src
            }
            fluid(maxWidth: 2048) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      fields {
        slug
      }
      childMarkdownRemark {
        html
        timeToRead
        excerpt
      }
    }
  }
`
