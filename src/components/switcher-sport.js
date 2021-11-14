import {faBiking, faRunning} from "@fortawesome/pro-light-svg-icons"
import {ThemeContext} from "css-system"
import React, {useContext} from "react"

import {Switch} from "../components/switch"
import {View} from "../components/view"
import {Icon} from "./icon"

export const SwitcherSport = ({onChange, css, ...props}) => {
  const theme = useContext(ThemeContext)
  return (
    <View
      css={{flexDirection: "row", gap: 2, alignItems: "center", ...css}}
      {...props}
    >
      <Icon
        icon={faRunning}
        css={{
          fontSize: 5,
        }}
        gradient
      />
      <View
        css={{
          "&& .toggle": {
            boxShadow: theme.boxShadow,
            backgroundColor: "backgroundLight",
            transitionProperty: "background",
            transitionDuration: theme.transition,
          },
          "&& .indicator": {
            boxShadow: "none",
          },
        }}
      >
        <Switch onChange={(checked) => onChange(checked ? "Ride" : "Run")} />
      </View>
      <Icon
        icon={faBiking}
        css={{
          fontSize: 5,
        }}
        gradient
      />
    </View>
  )
}
