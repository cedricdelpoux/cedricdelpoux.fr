import {faBiking, faRunning} from "@fortawesome/pro-light-svg-icons"
import {ThemeContext} from "css-system"
import {secondsToHours} from "date-fns"
import React, {useContext} from "react"

import {metersToKilometers} from "../utils/convertors"
import {Icon} from "./icon"
import {Paper} from "./paper"
import {Text} from "./text"
import {View} from "./view"

const Stat = ({data, text, color}) => (
  <View css={{alignItems: "center"}}>
    <Text css={{fontSize: 4, color}}>{data}</Text>
    <Text>{text}</Text>
  </View>
)

const SportTotal = ({
  totals = {distance: 0, time: 0, elevation: 0},
  color,
  icon,
}) => (
  <View css={{position: "relative"}}>
    <Paper css={{flexDirection: "row", p: 2, gap: 2}}>
      <Stat
        data={metersToKilometers(totals.distance, 0)}
        text={`km`}
        color={color}
      />
      <Stat data={secondsToHours(totals.time)} text={`h`} color={color} />
      <Stat data={totals.elevation.toFixed(0)} text={`d+`} color={color} />
    </Paper>
    <View
      css={{
        fontSize: 3,
        borderRadius: "50%",
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "backgroundLight",
        position: "absolute",
        top: 0,
        left: "50%",
        transform: `translateY(-55%) translateX(-50%)`,
      }}
    >
      <Icon icon={icon} css={{color, fontSize: 5}} />
    </View>
  </View>
)

export const SportStatsTotals = ({totals}) => {
  const theme = useContext(ThemeContext)
  const totalsRun = totals.find(({sport}) => sport === "Run")
  const totalsRide = totals.find(({sport}) => sport === "Ride")
  return (
    <View
      css={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <SportTotal
        totals={totalsRun}
        color={theme.colors.secondary}
        icon={faRunning}
      />
      <SportTotal
        totals={totalsRide}
        color={theme.colors.primary}
        icon={faBiking}
      />
    </View>
  )
}
