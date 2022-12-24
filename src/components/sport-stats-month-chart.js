import {faBiking, faRunning} from "@fortawesome/pro-light-svg-icons"
import {
  faHourglassEnd,
  faMountains,
  faRoad,
} from "@fortawesome/pro-light-svg-icons"
import {ThemeContext} from "css-system"
import {secondsToHours} from "date-fns"
import getDate from "date-fns/getDate"
import getDaysInMonth from "date-fns/getDaysInMonth"
import React, {useCallback, useContext, useMemo, useState} from "react"
import {FormattedDate} from "react-intl"
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import useModal from "../hooks/use-modal"
import {metersToKilometers} from "../utils/convertors"
import {Icon} from "./icon"
import Modal from "./modal"
import {Paper} from "./paper"
import {PaperActivity} from "./paper-activity"
import {Text} from "./text"
import {View} from "./view"

export const SportStatsMonthChart = ({data, month}) => {
  const theme = useContext(ThemeContext)
  const [activities, setActivities] = useState([])
  const [stat, setStat] = useState("distance")
  const {isModalOpen, openModal, closeModal} = useModal()

  const getDayData = useCallback(
    (dayData) => {
      if (!dayData) return 0

      switch (stat) {
        case "distance":
          return metersToKilometers(dayData.distance, 0)
        case "time":
          return secondsToHours(dayData.time)
        case "elevation":
          return dayData.elevation
      }
    },
    [stat]
  )

  const unit = useMemo(() => {
    switch (stat) {
      case "distance":
        return "km"
      case "time":
        return "h"
      case "elevation":
        return "d+"
    }
  }, [stat])

  const chartData = useMemo(() => {
    const daysInMonth = getDaysInMonth(new Date(month))
    const days = Array.from({length: daysInMonth}, (_, i) => i + 1)

    return days.map((day) => {
      const dayData = data?.group.find((group) => group.day == day)
      const rideData = dayData?.group.find((group) => group.sport === "Ride")
      const runData = dayData?.group.find((group) => group.sport === "Run")

      return {
        day,
        date: new Date(month + "-" + day),
        ride: getDayData(rideData),
        run: getDayData(runData),
        rideActivities: rideData?.activities || [],
        runActivities: runData?.activities || [],
      }
    })
  }, [data, month, getDayData])

  const handleClickOnBar = useCallback((activities) => {
    setActivities(activities)
    openModal()
  }, [])

  const axisDateFormatter = useCallback((value) => {
    const date = new Date(value)
    return getDate(date)
  }, [])

  const axisKilometersFormatter = useCallback(
    (value) => `${value} ${unit}`,
    [unit]
  )

  const renderCustomTooltip = useCallback(
    ({active, payload, label}) => {
      if (active && payload && payload.length) {
        return (
          <View
            css={{
              bg: "background",
              padding: 2,
              border: "1px solid",
              borderColor: "backgroundLight",
              gap: 1,
            }}
          >
            <Text css={{textTransform: "capitalize"}}>
              <FormattedDate
                value={label}
                day="numeric"
                month="long"
                year="numeric"
              />
            </Text>
            <View>
              {payload.map((sport) => (
                <View key={sport.name} css={{color: sport.color}}>
                  <Text>
                    <Icon
                      css={{width: "20px", textAlign: "center", mr: 1}}
                      icon={sport.name === "ride" ? faBiking : faRunning}
                    />
                    {`${sport.value} ${unit}`}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )
      }

      return null
    },
    [unit]
  )

  return (
    <View css={{position: "relative"}}>
      <Paper css={{height: "300px"}}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={axisDateFormatter}
              tick={{fill: theme.colors.text}}
              tickLine={{stroke: "#ccc"}}
              tickMargin={5}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              stroke={theme.colors.secondary}
              tickFormatter={axisKilometersFormatter}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke={theme.colors.primary}
              tickFormatter={axisKilometersFormatter}
            />
            <Tooltip
              content={renderCustomTooltip}
              cursor={{fill: theme.colors.background}}
              wrapperStyle={{outline: "none"}}
            />
            <Bar
              yAxisId="left"
              dataKey="run"
              fill={theme.colors.secondary}
              minPointSize={2}
              cursor="pointer"
              onClick={({runActivities}) => handleClickOnBar(runActivities)}
            />
            <Bar
              yAxisId="right"
              dataKey="ride"
              fill={theme.colors.primary}
              minPointSize={2}
              cursor="pointer"
              onClick={({rideActivities}) => handleClickOnBar(rideActivities)}
            />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
      <View
        css={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: `translateY(-50%) translateX(-50%)`,
          flexDirection: "row",
          gap: 2,
        }}
      >
        <Stat
          icon={faRoad}
          selected={stat === "distance"}
          onClick={() => setStat("distance")}
        />
        <Stat
          icon={faHourglassEnd}
          selected={stat === "time"}
          onClick={() => setStat("time")}
        />
        <Stat
          icon={faMountains}
          selected={stat === "elevation"}
          onClick={() => setStat("elevation")}
        />
      </View>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        css={{maxWidth: "300px", p: 0}}
      >
        <View css={{gap: 2}}>
          {activities.map((activity) => (
            <PaperActivity key={activity.id} {...activity} />
          ))}
        </View>
      </Modal>
    </View>
  )
}

const Stat = ({icon, selected, ...props}) => (
  <View
    css={{
      borderRadius: "50%",
      width: 50,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "backgroundLight",
      cursor: "pointer",
    }}
    {...props}
  >
    <Icon
      icon={icon}
      css={{
        fontSize: 5,
      }}
      gradient={selected}
      deps={[selected]}
    />
  </View>
)
