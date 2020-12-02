import Loadable from "@loadable/component"
import {ThemeContext} from "css-system"
import {faBiking, faRunning} from "@fortawesome/pro-light-svg-icons"
import React, {useContext} from "react"

import {Icon} from "./icon"
import {View} from "../components/view"

const Switch = Loadable(() => import("react-neumorphic-toggle"))

export const SwitcherSport = ({value, onChange, css, ...props}) => {
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
        <Switch
          value={value}
          onChange={onChange}
          theme={{
            color: `linear-gradient(to right, ${theme.colors.secondary} 0%, ${theme.colors.primary} 30%, ${theme.colors.primary} 70%, ${theme.colors.secondary} 100%)`,
          }}
        />
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
