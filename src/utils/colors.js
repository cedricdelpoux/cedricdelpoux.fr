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

const getColorWithOpacity = (color, opacity) =>
  chroma(color).alpha(opacity).hex()

const getColorsScale = (colors) => chroma.scale(colors)

export {
  getColorWithOpacity,
  getColorsScale,
  generateColorsRange,
  getColorFromRange,
  getRgbFromHex,
}
