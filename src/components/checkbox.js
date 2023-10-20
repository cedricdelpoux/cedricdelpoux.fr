import {faSquare, faSquareCheck} from "@fortawesome/pro-light-svg-icons"
import React from "react"

import {Icon} from "./icon"
import {Text} from "./text"
import {View} from "./view"

export const Checkbox = ({css, label, icon, checked, onChange, ...props}) => {
  return (
    <View
      css={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        cursor: "pointer",
      }}
      onClick={onChange ? () => onChange(!checked) : null}
    >
      <Icon
        icon={checked ? faSquareCheck : faSquare}
        css={{
          fontSize: 5,
          ...css,
        }}
        gradient
        {...props}
      />

      {label && <Text>{label}</Text>}
      {icon && (
        <Icon
          icon={icon}
          css={{
            fontSize: 3,
          }}
          gradient
        />
      )}
    </View>
  )
}
