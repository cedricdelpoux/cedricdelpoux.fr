import "swiper/css"

import React from "react"
import {Autoplay} from "swiper"
import {Swiper, SwiperSlide} from "swiper/react"

import {View} from "./view"

export const Slideshow = ({children, css, ...props}) => {
  return (
    <View
      as={Swiper}
      loop={true}
      autoplay={{
        delay: 1000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
      css={{...css}}
      {...props}
    >
      {React.Children.map(children, (child, i) => (
        <SwiperSlide key={i}>{child}</SwiperSlide>
      ))}
    </View>
  )
}
