import {
  faBiking,
  faCalendar,
  faRabbitFast,
  faRulerHorizontal,
  faRunning,
  faStopwatch,
} from "@fortawesome/pro-light-svg-icons"
import {ThemeContext} from "css-system"
import {graphql} from "gatsby"
import React, {useContext} from "react"

import {useMapbox} from "../hooks/use-mapbox"
import {
  metersPerSecondTokmPerHour,
  metersToKilometers,
} from "../utils/convertors"
import {secondsToHms} from "../utils/formattors"
import {Icon} from "./icon"
import {Paper} from "./paper"
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
  id,
  type,
  average_speed,
  start_date_formatted,
  moving_time,
  distance,
  map: {summary_polyline},
  ...props
}) => {
  const theme = useContext(ThemeContext)
  const mapUrl = useMapbox(summary_polyline)
  const timeObject = secondsToHms(moving_time)
  return (
    <Paper
      to={`https://www.strava.com/activities/${id}`}
      css={{position: "relative", p: 0}}
      {...props}
    >
      <View
        as="img"
        src={mapUrl}
        css={{objectFit: "cover", height: "300px"}}
        alt={`Activity map ${id}`}
      />
      <View
        css={{
          position: "absolute",
          top: 2,
          right: 2,
          fontSize: 3,
          borderRadius: "50%",
          width: 40,
          height: 40,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "background",
        }}
      >
        <Icon icon={type === "Ride" ? faBiking : faRunning} gradient />
      </View>
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
            <Text css={{fontSize: 3, fontWeight: "bold"}}>
              {start_date_formatted}
            </Text>
          </Text>
        </GridItem>
        <GridItem>
          <Icon
            icon={faStopwatch}
            css={{
              fontSize: 5,
            }}
            gradient
          />
          <Text>
            {timeObject.h > 0 && (
              <>
                <Text css={{fontSize: 3}}>{timeObject.h}</Text>
                <Text css={{fontSize: 2}}>h</Text>
              </>
            )}
            {timeObject.m > 0 && (
              <>
                <Text css={{fontSize: 3}}>{" " + timeObject.m}</Text>
                <Text css={{fontSize: 2}}>m</Text>
              </>
            )}
            <Text css={{fontSize: 3}}>{" " + timeObject.s}</Text>
            <Text css={{fontSize: 2}}>s</Text>
          </Text>
        </GridItem>
        <GridItem>
          <Icon
            icon={faRulerHorizontal}
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

export const query = graphql`
  fragment PaperActivityFragment on StravaActivity {
    id
    type
    start_date
    start_date_formatted: start_date(formatString: "DD MMM YY")
    moving_time
    distance
    average_speed
    map {
      summary_polyline
    }
  }
`
