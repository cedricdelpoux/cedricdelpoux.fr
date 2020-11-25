import React from "react"
import {Text} from "./text"

export const InputCheckbox = ({css, id, label, ...props}) => {
  return (
    <Text>
      <Text
        as="input"
        type="checkbox"
        id={id}
        css={{
          display: "none",
          "& + label": {
            display: "inline",
            "&:before": {
              content: '""',
              display: "inline-flex",
              left: "0",
              width: "8px",
              height: "8px",
              mr: 1,
              border: "1px solid",
              borderColor: "secondary",
            },
          },

          "&:checked + label:before": {
            backgroundColor: "secondary",
          },
          ...css,
        }}
        {...props}
      />
      <Text as="label" htmlFor={id}>
        {label}
      </Text>
    </Text>
  )
}
