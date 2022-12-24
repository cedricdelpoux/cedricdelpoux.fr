import {ThemeContext} from "css-system"
import React, {useContext} from "react"
import ReactDOM from "react-dom"

import {View} from "./view"

const Modal = ({isOpen, onClose, children, css}) => {
  const theme = useContext(ThemeContext)

  if (!isOpen) return null

  return ReactDOM.createPortal(
    <View
      css={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 2,
      }}
      onClick={onClose}
    >
      <View
        css={{
          p: 2,
          bg: "backgroundLight",
          boxShadow: theme.boxShadow,
          color: "text",
          borderRadius: 2,
          position: "relative",
          margin: "auto",
          maxWidth: "500px",
          width: "80%",
          ...css,
        }}
      >
        {children}
      </View>
    </View>,
    document.body
  )
}

export default Modal
