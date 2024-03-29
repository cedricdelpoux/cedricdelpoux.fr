import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import React from "react"

import {Text} from "./text"

export const Icon = ({icon, css, gradient, ...props}) => (
  <Text
    as={FontAwesomeIcon}
    icon={icon}
    css={{
      "&&": {
        height: "1em",
        fontSize: "20px",
        "& path:first-child": gradient && {
          fill: "url(#svg-gradient)",
        },
        ...css,
      },
    }}
    {...props}
  />
)
