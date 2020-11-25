import {Range} from "react-range"
import {ThemeContext} from "css-system"
import React, {useCallback, useContext, useEffect, useState} from "react"

import {View} from "./view"

export default ({minValue, maxValue, onChange, unit, ...props}) => {
  const theme = useContext(ThemeContext)
  const [value, setValue] = useState({
    min: minValue,
    max: maxValue,
  })

  useEffect(() => {
    setValue({
      min: minValue,
      max: maxValue,
    })
  }, [minValue, maxValue])

  const getTrackBackground = useCallback(() => {
    const progressMin = ((value.min - minValue) / (maxValue - minValue)) * 100
    const progressMax = ((value.max - minValue) / (maxValue - minValue)) * 100
    return `linear-gradient(to right,
      ${theme.colors.backgroundLight} 0%,
      ${theme.colors.backgroundLight} ${progressMin}%,
      ${theme.colors.secondary} ${progressMin}%,
      ${theme.colors.primary} ${progressMax}%,
      ${theme.colors.backgroundLight} ${progressMax}%,
      ${theme.colors.backgroundLight} 100%)`
  }, [value, minValue, maxValue, theme])

  return (
    <View css={{py: 2, px: 3, flex: 1, alignSelf: "stretch"}} {...props}>
      <Range
        values={[value.min, value.max]}
        step={1}
        min={minValue}
        max={maxValue}
        onChange={([min, max]) => {
          setValue({min, max})
        }}
        onFinalChange={([min, max]) => {
          onChange({min, max})
        }}
        renderTrack={({props, children}) => (
          <View
            ref={props.ref}
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              background: getTrackBackground(),
            }}
            css={{
              height: theme.space[1],
              borderRadius: 2,
              boxShadow: theme.boxShadow,
            }}
          >
            {children}
          </View>
        )}
        renderThumb={({props}) => (
          <View
            {...props}
            css={{
              borderRadius: 2,
              boxShadow: theme.boxShadow,
              px: 1,
              height: theme.space[1] + theme.space[3],
              color: "#fff",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor:
                props.key === 0 ? theme.colors.secondary : theme.colors.primary,
              "&:focus": {
                outline: "none",
              },
            }}
            style={props.style}
          >
            {`${props["aria-valuenow"]} ${unit}`}
          </View>
        )}
      />
    </View>
  )
}
