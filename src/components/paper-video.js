import {faYoutube} from "@fortawesome/free-brands-svg-icons"
import {faEye, faThumbsUp} from "@fortawesome/pro-light-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {graphql} from "gatsby"
import {GatsbyImage, getImage} from "gatsby-plugin-image"
import React, {useState} from "react"

import {Link} from "./link"
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
              as={GatsbyImage}
              image={getImage(cover)}
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

export const PaperVideoCompact = ({id, title, cover, css}) => {
  return (
    <View
      as={Link}
      to={`https://www.youtube.com/watch?v=${id}`}
      css={{
        borderRadius: 2,
        overflow: "hidden",
        width: "100%",
        justifyContent: "center",
        aspectRatio: "16 / 9",
        position: "relative",
        "&:hover svg > path": {
          fill: "url(#svg-gradient)",
        },
        ...css,
      }}
    >
      <View key="cover" as={GatsbyImage} image={getImage(cover)} alt={title} />
      <View
        as={FontAwesomeIcon}
        icon={faYoutube}
        css={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "3em",
          "& > path": {
            fill: "background",
            stroke: "url(#svg-gradient)",
            strokeWidth: "16px",
          },
        }}
      />
    </View>
  )
}

export const query = graphql`
  fragment PaperVideoFragment on YoutubeVideo {
    id
    title
    cover {
      childImageSharp {
        gatsbyImageData(width: 500, placeholder: BLURRED)
      }
    }
    statistics {
      viewCount
      likeCount
    }
  }
`
