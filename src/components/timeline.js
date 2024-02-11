import "react-vertical-timeline-component/style.min.css"

import {ThemeContext} from "css-system"
import React, {useContext} from "react"
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component"

import {View} from "./view"

export const TimelineItem = ({icon, date, children}) => {
  const theme = useContext(ThemeContext)
  return (
    <View
      as={VerticalTimelineElement}
      css={{
        display: "block",
        my: 2,
        mx: 0,
        "& .vertical-timeline-element-content": {
          display: "flex",
          flexDirection: "column",
          backgroundColor: "backgroundLight",
          border: "1px solid rgba(0, 0, 0, 0.1)",
          borderRadius: 0,
          boxShadow: theme.boxShadow,
        },
        "& .vertical-timeline-element-content-arrow": {
          borderRight: `7px solid ${theme.colors.backgroundLight}`,
        },
        "& .vertical-timeline-element-icon": {
          boxShadow: "none",
          fontSize: "30px",
          "& svg": {
            m: 0,
            transform: "translate(-50%, -50%)",
          },
          "&::before, &::after": {
            content: '""',
            position: "absolute",
            borderRadius: "50%",
            zIndex: -1,
          },
          "&::before": {
            left: "-4px",
            right: "-4px",
            bottom: "-4px",
            top: "-4px",
            background: `linear-gradient(to right, ${theme.colors.secondary} 0%,${theme.colors.secondary} 30%, ${theme.colors.primary} 100%)`,
          },
          "&::after": {
            left: "0",
            right: "0",
            bottom: "0",
            top: "0",
            backgroundColor: "backgroundLight",
          },
        },
      }}
      date={date}
      icon={icon}
    >
      {children}
    </View>
  )
}

export const Timeline = ({children}) => {
  const theme = useContext(ThemeContext)
  return (
    <View
      as={VerticalTimeline}
      css={{
        width: "100% !important",
        "&::before": {
          background: `linear-gradient(to bottom, ${theme.colors.secondary} 0%, ${theme.colors.primary} 100%) !important`,
        },
      }}
    >
      {children}
    </View>
  )
}
