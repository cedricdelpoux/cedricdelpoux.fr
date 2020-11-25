import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

import {Text} from "./text"

export const Icon = ({icon, onClick, css, gradient}) => (
  <Text
    as={FontAwesomeIcon}
    icon={icon}
    css={{
      fontSize: "20px",
      "& path:first-child": gradient && {
        fill: "url(#svg-gradient)",
      },
      ...css,
    }}
    onClick={onClick}
  />
)
