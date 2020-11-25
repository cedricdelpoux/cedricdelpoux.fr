import chroma from "chroma-js"

const generateColorsRange = ({colors, min, max}) => {
  return chroma
    .scale(colors)
    .mode("lch")
    .domain([min, max > min ? max : min + 1])
}

const getColorFromRange = (colorsRange, value) => {
  return colorsRange(value).hex()
}

const getRgbFromHex = (hex) => chroma(hex).rgb()

export {generateColorsRange, getColorFromRange, getRgbFromHex}
