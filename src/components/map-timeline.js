import React, {memo, useContext, useMemo} from "react"
import {ThemeContext} from "css-system"
import {useIntl} from "react-intl"

import {Text} from "./text"
import {View} from "./view"

const TRACK_HEIGHT = 6
const THUMB_SIZE = 18
const RULER_HEIGHT = 30
const TOOLTIP_GAP = 6
const RANGE_CLASS_NAME = "map-timeline-range"

const noop = () => {}

// Where the thumb's center is at `index`: the thumb never overflows the
// input, so its center runs from half a thumb to the end minus half a thumb
const thumbCenter = (index, max) =>
  `calc(${THUMB_SIZE / 2}px + (100% - ${THUMB_SIZE}px) * ${
    max > 0 ? index / max : 1
  })`

// A tick per month, longer and labelled with the year on January
const Ruler = memo(({yearMonths}) => {
  const max = yearMonths.length - 1

  return (
    <View
      aria-hidden
      css={{position: "relative", height: RULER_HEIGHT, pointerEvents: "none"}}
    >
      {yearMonths.map((yearMonth, index) => {
        const [year, month] = yearMonth.split("-")
        const isYear = month === "01"

        return (
          <View
            key={yearMonth}
            css={{
              position: "absolute",
              bottom: 0,
              alignItems: "center",
              transform: "translateX(-50%)",
            }}
            style={{left: thumbCenter(index, max)}}
          >
            {isYear && (
              <Text
                css={{
                  fontSize: 1,
                  fontWeight: "bold",
                  lineHeight: 1.6,
                  whiteSpace: "nowrap",
                }}
              >
                {year}
              </Text>
            )}
            <View
              css={{
                width: 1,
                height: isYear ? 10 : 4,
                bg: "text",
                opacity: isYear ? 0.8 : 0.3,
              }}
            />
          </View>
        )
      })}
    </View>
  )
})

// The months of `yearMonths` as a ruler above the map, `children`, and a
// gradient track on the map's top edge, filled up to the current month. The
// thumb carries the name of that month. It can be dragged, or moved with the
// arrow keys, when `onIndexChange` is given.
export const MapTimeline = ({
  yearMonths,
  index,
  onIndexChange,
  children,
  css,
}) => {
  const theme = useContext(ThemeContext)
  const intl = useIntl()
  const max = yearMonths.length - 1
  const isInteractive = Boolean(onIndexChange)

  const label = useMemo(
    () =>
      yearMonths[index]
        ? new Date(`${yearMonths[index]}-01`).toLocaleDateString(intl.locale, {
            month: "long",
            year: "numeric",
          })
        : "",
    [yearMonths, index, intl.locale]
  )

  // The thumb's pseudo-elements are vendor specific, and a browser throws
  // when `insertRule` hands it a selector it does not know, which is how
  // css-system adds its rules. In a `<style>` element, it only drops that
  // rule instead.
  const thumb = `
    width: ${THUMB_SIZE}px;
    height: ${THUMB_SIZE}px;
    border-radius: 50%;
    border: 3px solid ${theme.colors.primary};
    background: ${theme.colors.background};
    cursor: ${isInteractive ? "pointer" : "default"};
    transition: transform ${theme.transition};
  `
  const track = `
    height: ${THUMB_SIZE}px;
    background: transparent;
  `
  const rangeCss = `
    .${RANGE_CLASS_NAME}::-webkit-slider-runnable-track {${track}}
    .${RANGE_CLASS_NAME}::-moz-range-track {${track}}
    .${RANGE_CLASS_NAME}::-webkit-slider-thumb {
      ${thumb}
      -webkit-appearance: none;
    }
    .${RANGE_CLASS_NAME}::-moz-range-thumb {${thumb}}
    .${RANGE_CLASS_NAME}:hover::-webkit-slider-thumb,
    .${RANGE_CLASS_NAME}:focus-visible::-webkit-slider-thumb {
      transform: scale(${isInteractive ? 1.2 : 1});
    }
    .${RANGE_CLASS_NAME}:hover::-moz-range-thumb,
    .${RANGE_CLASS_NAME}:focus-visible::-moz-range-thumb {
      transform: scale(${isInteractive ? 1.2 : 1});
    }
  `

  return (
    <View css={{alignSelf: "stretch", ...css}}>
      <style>{rangeCss}</style>
      <Ruler yearMonths={yearMonths} />
      <View css={{position: "relative"}}>
        {/* Clipped to the map's rounded corners, the track follows them */}
        <View
          css={{
            position: "relative",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          {children}
          <View
            css={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: TRACK_HEIGHT,
              zIndex: 1,
              pointerEvents: "none",
              // `View` animates its background, the fill would lag behind
              // the thumb while dragging
              transitionProperty: "none",
            }}
            // Filled up to the thumb's center, which is where the ticks are
            style={{
              backgroundImage: `${theme.colors.gradient}, linear-gradient(${theme.colors.backgroundLight}, ${theme.colors.backgroundLight})`,
              backgroundSize: `${thumbCenter(index, max)} 100%, 100% 100%`,
              backgroundRepeat: "no-repeat",
            }}
          />
        </View>
        <View
          as="input"
          type="range"
          className={RANGE_CLASS_NAME}
          aria-label={label}
          min={0}
          max={max}
          step={1}
          value={index}
          readOnly={!isInteractive}
          tabIndex={isInteractive ? undefined : -1}
          onChange={
            isInteractive
              ? (event) => onIndexChange(Number(event.target.value))
              : noop
          }
          css={{
            position: "absolute",
            top: TRACK_HEIGHT / 2 - THUMB_SIZE / 2,
            left: 0,
            width: "100%",
            height: THUMB_SIZE,
            zIndex: 1,
            m: 0,
            appearance: "none",
            "-webkit-appearance": "none",
            background: "transparent",
            outline: "none",
          }}
          style={{
            pointerEvents: isInteractive ? "auto" : "none",
            cursor: isInteractive ? "pointer" : "default",
          }}
        />
        {/* Centered under the thumb */}
        <Text
          aria-hidden
          css={{
            position: "absolute",
            top: TRACK_HEIGHT / 2 + THUMB_SIZE / 2 + TOOLTIP_GAP,
            px: 1,
            borderRadius: 1,
            bg: "background",
            boxShadow: theme.boxShadow,
            fontSize: 1,
            fontWeight: "bold",
            lineHeight: 1.8,
            whiteSpace: "nowrap",
            zIndex: 1,
            pointerEvents: "none",
            transitionProperty: "none",
            "&::first-letter": {textTransform: "uppercase"},
          }}
          style={{
            left: thumbCenter(index, max),
            transform: "translateX(-50%)",
          }}
        >
          {label}
        </Text>
      </View>
    </View>
  )
}
