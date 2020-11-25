import {ThemeContext} from "css-system"
import {useLocation} from "@reach/router"
import React, {useContext, useEffect} from "react"
import OffCanvas from "react-aria-offcanvas"
import {faTimesCircle} from "@fortawesome/pro-light-svg-icons"

import {Icon} from "./icon"
import {View} from "./view"

export const Sidebar = ({isOpen, onClose, children, css, ...props}) => {
  const theme = useContext(ThemeContext)
  const location = useLocation()

  useEffect(() => {
    if (onClose) {
      onClose()
    }
  }, [location])

  return (
    <OffCanvas
      isOpen={isOpen}
      onClose={onClose}
      position="right"
      height="100vh"
      style={{
        content: {
          width: "unset",
          background: theme.colors.background,
          color: theme.colors.text,
        },
        overlay: {
          background: "rgba(0, 0, 0, 0.4)",
        },
      }}
    >
      <View css={{alignItems: "flex-end", p: {_: 2, m: 3}}}>
        <Icon
          icon={faTimesCircle}
          css={{
            fontSize: "32px",
            cursor: "pointer",
          }}
          onClick={onClose}
        />
      </View>
      <View css={{p: {_: 2, m: 3}, gap: 2, ...css}} {...props}>
        {children}
      </View>
    </OffCanvas>
  )
}
