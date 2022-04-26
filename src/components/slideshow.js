import "react-slideshow-image/dist/styles.css"

import React from "react"
import {Slide} from "react-slideshow-image"

import {View} from "./view"

export const Slideshow = ({children, css, ...props}) => {
  return (
    <View
      as={Slide}
      duration={1000}
      transitionDuration={500}
      arrows={false}
      pauseOnHover={false}
      canSwipe={false}
      css={{...css}}
      {...props}
    >
      {children}
    </View>
  )
}
