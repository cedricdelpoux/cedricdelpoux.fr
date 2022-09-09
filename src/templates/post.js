import {faCalendarDay, faHourglassHalf} from "@fortawesome/pro-light-svg-icons"
import Loadable from "@loadable/component"
import {graphql} from "gatsby"
import React from "react"
import {Helmet} from "react-helmet"
import {FormattedMessage} from "react-intl"
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  PocketIcon,
  PocketShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share"

import {Html} from "../components/html"
import {Title} from "../components/title"
import {View} from "../components/view"
import {LayoutPage} from "../layouts/page"

const ReactDisqusComments = Loadable(() => import("react-disqus-comments"))

const Post = ({
  data: {
    googleDocs: {
      date,
      name: title,
      cover,
      timeToRead,
      childMdx: {excerpt, body},
    },
  },
  location,
}) => {
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
      <Html body={body} />
      {location && (
        <>
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
            <EmailShareButton url={location.href}>
              <EmailIcon size={48} round />
            </EmailShareButton>
            <WhatsappShareButton url={location.href}>
              <WhatsappIcon size={48} round />
            </WhatsappShareButton>
            <PocketShareButton url={location.href} title={title}>
              <PocketIcon size={48} round />
            </PocketShareButton>
            <FacebookShareButton url={location.href} quote={excerpt}>
              <FacebookIcon size={48} round />
            </FacebookShareButton>
            <TwitterShareButton url={location.href} title={title}>
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
          <ReactDisqusComments
            shortname="cedricdelpoux"
            identifier={location.pathname}
            url={location.href}
            title={title}
            language="fr"
          />
        </>
      )}
    </LayoutPage>
  )
}

export default Post

export const pageQuery = graphql`
  query Post($path: String!) {
    googleDocs(slug: {eq: $path}) {
      name
      date(formatString: "Do MMMM YYYY", locale: "fr")
      cover {
        image {
          childImageSharp {
            gatsbyImageData(width: 1000)
          }
        }
      }
      timeToRead
      childMdx {
        body
        excerpt
      }
    }
  }
`
