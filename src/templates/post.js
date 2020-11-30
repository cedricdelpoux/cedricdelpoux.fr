import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share"
import {FormattedMessage} from "react-intl"
import {Helmet} from "react-helmet"
import {faCalendarDay, faHourglassHalf} from "@fortawesome/pro-light-svg-icons"
import {graphql} from "gatsby"
import React from "react"
import ReactDisqusComments from "react-disqus-comments"

import path from "path"

import {Html} from "../components/html"
import {LayoutPage} from "../layouts/page"
import {Title} from "../components/title"
import {View} from "../components/view"

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
  const absoluteUrl = path.join(siteMetadata.siteUrl, slug)
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
          <EmailIcon />
        </EmailShareButton>
        <FacebookShareButton url={absoluteUrl} quote={excerpt}>
          <FacebookIcon />
        </FacebookShareButton>
        <TwitterShareButton url={absoluteUrl} title={title}>
          <TwitterIcon />
        </TwitterShareButton>
        <WhatsappShareButton url={absoluteUrl}>
          <WhatsappIcon />
        </WhatsappShareButton>
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
  query PostBySlug($path: String!) {
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
