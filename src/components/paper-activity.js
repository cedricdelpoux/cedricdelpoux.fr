import {
  faBiking,
  faCalendar,
  faMountains,
  faRabbitFast,
  faRoad,
  faRunning,
} from "@fortawesome/pro-light-svg-icons"
import {ThemeContext} from "css-system"
import {graphql} from "gatsby"
import React, {useContext} from "react"

import {useMapbox} from "../hooks/use-mapbox"
import {
  metersPerSecondTokmPerHour,
  metersToKilometers,
} from "../utils/convertors"
import {getStravaActivityUrl} from "../utils/strava"
import {Icon} from "./icon"
import {Paper, PaperIcon, PaperMetadata} from "./paper"
import {Text} from "./text"
import {View} from "./view"

const Grid = ({css, children, ...props}) => (
  <View
    css={{
      display: "grid",
      ...css,
    }}
    {...props}
  >
    {children}
  </View>
)

const GridItem = ({css, children, ...props}) => (
  <View css={{p: 2, alignItems: "center", gap: 1, ...css}} {...props}>
    {children}
  </View>
)

export const PaperActivity = ({
  average_speed,
  distance,
  id,
  map,
  start_date,
  total_elevation_gain,
  type,
  ...props
}) => {
  const theme = useContext(ThemeContext)
  const mapUrl = useMapbox({
    polyline: map.summary_polyline,
    width: 300,
    height: 300,
  })
  return (
    <Paper
      to={getStravaActivityUrl(id)}
      css={{position: "relative", p: 0}}
      {...props}
    >
      <View
        as="img"
        src={mapUrl}
        alt={`Activity map ${id}`}
        css={{minHeight: "300px"}}
      />
      <PaperIcon
        icon={type === "Ride" ? faBiking : faRunning}
        css={{
          position: "absolute",
          top: 2,
          right: 2,
        }}
      />
      <Grid
        css={{
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          background: theme.colors.gradient,
          gridGap: "1px",
          textAlign: "center",
          color: "text",
          fontWeight: "bold",
          position: "relative",
          "& > *": {
            backgroundColor: "backgroundLight",
          },
          "&::after": {
            content: '""',
            background: `linear-gradient(to right, ${theme.colors.secondary} 0%, ${theme.colors.secondary} 30%, ${theme.colors.primary} 100%)`,
            position: "absolute",
            top: "-1px",
            left: 0,
            right: 0,
            height: "2px",
          },
        }}
      >
        <GridItem>
          <Icon
            icon={faCalendar}
            css={{
              fontSize: 5,
            }}
            gradient
          />
          <Text>
            <Text css={{fontSize: 3, fontWeight: "bold"}}>{start_date}</Text>
          </Text>
        </GridItem>
        <GridItem>
          <Icon
            icon={faMountains}
            css={{
              fontSize: 5,
            }}
            gradient
          />
          <Text>
            <Text css={{fontSize: 3}}>{total_elevation_gain}</Text>
            <Text css={{fontSize: 2}}>{" d+"}</Text>
          </Text>
        </GridItem>
        <GridItem>
          <Icon
            icon={faRoad}
            css={{
              fontSize: 5,
            }}
            gradient
          />
          <Text>
            <Text css={{fontSize: 3}}>{metersToKilometers(distance)}</Text>
            <Text css={{fontSize: 2}}>{" km"}</Text>
          </Text>
        </GridItem>
        <GridItem>
          <Icon
            icon={faRabbitFast}
            css={{
              fontSize: 5,
            }}
            gradient
          />
          <Text>
            <Text css={{fontSize: 3}}>
              {metersPerSecondTokmPerHour(average_speed)}
            </Text>
            <Text css={{fontSize: 2}}>{" km/h"}</Text>
          </Text>
        </GridItem>
      </Grid>
    </Paper>
  )
}

export const PaperActivityCompact = ({
  id,
  type,
  start_date,
  distance,
  map,
  name,
  total_elevation_gain,
  ...props
}) => {
  const mapUrl = useMapbox({
    polyline: map.summary_polyline,
    width: 130,
    height: 75,
  })
  return (
    <Paper
      to={getStravaActivityUrl(id)}
      css={{flexDirection: "row", p: 0}}
      {...props}
    >
      <View
        as="img"
        src={mapUrl}
        css={{objectFit: "cover", width: "130px", height: "75px"}}
        alt={`Activity map ${id}`}
      />
      <View css={{flex: 1, py: 1, px: 2}}>
        <View css={{flexDirection: "row", alignItems: "center", gap: 1}}>
          <Icon
            icon={type === "Ride" ? faBiking : faRunning}
            css={{
              fontSize: "20px",
            }}
            gradient
          />
          <Text ellipsis>{name}</Text>
        </View>
        <PaperMetadata
          items={[
            {icon: faRoad, label: `${metersToKilometers(distance)} km`},
            {icon: faMountains, label: `${total_elevation_gain} d+`},
            {
              icon: faCalendar,
              label: start_date,
            },
          ]}
          css={{p: 0, justifyContent: "start"}}
        />
      </View>
    </Paper>
  )
}

export const query = graphql`
  fragment PaperActivityFragment on StravaActivity {
    id
    name
    type
    start_date(formatString: "DD MMM YY")
    moving_time
    distance
    average_speed
    total_elevation_gain
    map {
      summary_polyline
    }
  }
`
