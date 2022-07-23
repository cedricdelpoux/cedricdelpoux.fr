import {faStrava} from "@fortawesome/free-brands-svg-icons"
import {
  faBiking,
  faCalendar,
  faFaceTongueSweat,
  faFire,
  faMessage,
  faMountains,
  faRabbitFast,
  faRoad,
  faRunning,
  faThumbsUp,
} from "@fortawesome/pro-light-svg-icons"
import React from "react"

import {useMapbox} from "../hooks/use-mapbox"
import {
  metersPerSecondTokmPerHour,
  metersToKilometers,
} from "../utils/convertors"
import {getStravaActivityUrl} from "../utils/strava"
import {Button} from "./button"
import {Icon} from "./icon"
import {Link} from "./link"
import {Paper, PaperIcon} from "./paper"
import {Text} from "./text"
import {Title} from "./title"
import {View} from "./view"

const Data = ({icon, text, css}) => (
  <Text css={css}>
    <Icon
      icon={icon}
      css={{
        fontSize: 5,
        mr: 1,
      }}
      gradient
    />
    <Text>{text}</Text>
  </Text>
)

export const StravaEmbed = ({
  id,
  type,
  name,
  average_speed,
  start_date,
  comment_count,
  calories,
  distance,
  kudos_count,
  suffer_score,
  polyline,
  total_elevation_gain,
  photo,
}) => {
  const mapUrl = useMapbox({
    polyline,
    style: "mapbox/satellite-streets-v11",
    width: 300,
    height: 180,
  })

  return (
    <Paper
      css={{
        position: "relative",
        gap: 2,
        fontSize: 3,
      }}
    >
      <Title css={{fontSize: 4, fontWeight: "bold", mx: 4}}>{name}</Title>
      <View
        css={{
          flexDirection: "row",
          justifyContent: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Data icon={faCalendar} text={start_date} />
        <Data icon={faRoad} text={`${metersToKilometers(distance)} km`} />
        <Data icon={faMountains} text={`${total_elevation_gain} d+`} />
        <Data
          icon={faRabbitFast}
          text={`${metersPerSecondTokmPerHour(average_speed)} km/h`}
        />
      </View>
      <View css={{flexDirection: "row", gap: 2}}>
        <View
          as={Link}
          to={getStravaActivityUrl(id)}
          css={{flex: 1, background: "unset !important"}}
        >
          <View as="img" src={mapUrl} alt={`Activity map ${id}`} />
        </View>
        {photo && (
          <View
            as={Link}
            to={getStravaActivityUrl(id)}
            css={{flex: 1, background: "unset !important"}}
          >
            <View
              as="img"
              src={photo}
              css={{height: "100%", objectFit: "cover"}}
              alt={`Photo ${id}`}
            />
          </View>
        )}
      </View>
      <View
        css={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Data icon={faThumbsUp} text={kudos_count} />
        <Data icon={faMessage} text={comment_count} />
        <Button
          as={Link}
          to={getStravaActivityUrl(id)}
          icon={faStrava}
          text="Strava"
          inset="2px"
          css={{order: {_: 5, s: 3}, mt: {_: 2, s: "unset"}}}
        />
        <Data icon={faFire} text={calories} css={{order: {_: 3, s: 4}}} />
        <Data
          icon={faFaceTongueSweat}
          text={suffer_score}
          css={{order: {_: 4, s: 5}}}
        />
      </View>
      <PaperIcon
        icon={type === "Ride" ? faBiking : faRunning}
        css={{
          mt: 0,
          position: "absolute",
          top: 3,
          left: 3,
        }}
      />
    </Paper>
  )
}
