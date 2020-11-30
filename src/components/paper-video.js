import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faEye, faThumbsUp} from "@fortawesome/pro-light-svg-icons"
import {faYoutube} from "@fortawesome/free-brands-svg-icons"
import {graphql} from "gatsby"
import Img from "gatsby-image"
import React, {useState} from "react"

import {Paper, PaperMetadata} from "./paper"
import {Title} from "./title"
import {View} from "./view"

export const PaperVideo = ({id, title, cover, statistics}) => {
  const [showYoutube, setShowYoutube] = useState(cover ? false : true)
  const autoplay = cover ? 1 : 0
  const props = showYoutube
    ? {
        to: `https://www.youtube.com/watch?v=${id}`,
      }
    : {
        onClick: () => setShowYoutube(true),
      }
  return (
    <Paper
      key={id}
      css={{
        pt: 3,
        pb: 0,
        px: 0,
        gap: 2,
        "&:hover svg > path": {
          fill: "url(#svg-gradient)",
          stroke: "#fff",
        },
      }}
      {...props}
    >
      <Title as="h2" css={{m: 0, px: 3}}>
        {title}
      </Title>
      <PaperMetadata
        items={[
          {icon: faEye, label: statistics.viewCount},
          {icon: faThumbsUp, label: statistics.likeCount},
        ]}
      />
      <View
        css={{
          position: "relative",
          width: "100%",
          height: 0,
          pb: "56.25%",
          overflow: "hidden",
        }}
      >
        {showYoutube ? (
          <View
            key="iframe"
            as="iframe"
            src={`https://www.youtube.com/embed/${id}?autoplay=${autoplay}`}
            frameBorder="0"
            allowFullScreen="allowfullscreen"
            title={title}
            css={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          />
        ) : (
          <>
            <View
              key="cover"
              as={Img}
              fluid={cover.childImageSharp.fluid}
              css={{
                width: "100%",
                position: "absolute !important",
                top: "50%",
                transform: "translateY(-50%)",
              }}
              alt={title}
            />
            <View
              as={FontAwesomeIcon}
              icon={faYoutube}
              css={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "64px",
                "& > path": {
                  fill: "background",
                  stroke: "url(#svg-gradient)",
                  strokeWidth: "16px",
                },
              }}
            />
          </>
        )}
      </View>
    </Paper>
  )
}

export const query = graphql`
  fragment YoutubeVideoFragment on YoutubeVideo {
    id
    title
    cover {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    statistics {
      viewCount
      likeCount
    }
  }
`
