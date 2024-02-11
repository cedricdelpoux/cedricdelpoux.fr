import {faBiking, faRunning} from "@fortawesome/pro-light-svg-icons"
import {
  faHourglassEnd,
  faMountains,
  faRoad,
} from "@fortawesome/pro-light-svg-icons"
import {ThemeContext} from "css-system"
import {secondsToHours} from "date-fns"
import {GoogleDocsContext} from "gatsby-source-google-docs"
import _startCase from "lodash/startCase"
import React, {useCallback, useContext, useMemo, useState} from "react"
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
import {SportTableActivities} from "./sport-table-activities"
import {Text} from "./text"
import {View} from "./view"

export const SportStatsChart = ({data, xDateOptions, tooltipDateOptions}) => {
  const theme = useContext(ThemeContext)
  const {locale} = useContext(GoogleDocsContext)
  const [activities, setActivities] = useState([])
  const [stat, setStat] = useState("distance")
  const {isModalOpen, openModal, closeModal} = useModal()

  const getValue = useCallback(
    (data) => {
      if (!data) return 0

      switch (stat) {
        case "distance":
          return metersToKilometers(data.distance, 0)
        case "time":
          return secondsToHours(data.time)
        case "elevation":
          return data.elevation
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
    return data.map(({date, data}) => {
      const rideData = data?.group.find((group) => group.sport === "Ride")
      const runData = data?.group.find((group) => group.sport === "Run")

      return {
        data,
        date,
        ride: getValue(rideData),
        run: getValue(runData),
        rideActivities: rideData?.activities || [],
        runActivities: runData?.activities || [],
      }
    })
  }, [data, getValue])

  const handleClickOnBar = useCallback((activities) => {
    setActivities(activities)
    openModal()
  }, [])
  const xAxisFormatter = useCallback(
    (value) => {
      const date = new Date(value)

      const formattedDate = new Intl.DateTimeFormat(
        locale,
        xDateOptions
      ).format(date)
      return _startCase(formattedDate)
    },
    [locale, xDateOptions]
  )

  const yAxisFormatter = useCallback(
    (value) => {
      const shortValue = new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 1,
        notation: "compact",
        compactDisplay: "short",
      }).format(value)
      return `${shortValue} ${unit}`
    },
    [unit]
  )

  const tooltipRenderer = useCallback(
    ({active, payload, label}) => {
      if (active && payload && payload.length) {
        const formattedDate = new Intl.DateTimeFormat(
          locale,
          tooltipDateOptions
        ).format(label)
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
            <Text>{_startCase(formattedDate)}</Text>
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
    [unit, tooltipDateOptions]
  )

  return (
    <View css={{position: "relative", fontSize: 3}}>
      <Paper css={{height: "300px"}}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={xAxisFormatter}
              tick={{fill: theme.colors.text}}
              tickLine={{stroke: "#ccc"}}
              tickMargin={5}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              stroke={theme.colors.secondary}
              tickFormatter={yAxisFormatter}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke={theme.colors.primary}
              tickFormatter={yAxisFormatter}
            />
            <Tooltip
              content={tooltipRenderer}
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
        <SportTableActivities activities={activities} />
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
