import {useSwitchTheme} from "@css-system/gatsby-plugin-css-system"
import {ThemeContext} from "css-system"
import {useContext} from "react"

const TOKEN = process.env.GATSBY_MAPBOX_TOKEN
const THEME_LIGHT = "ckhj9ux1x2w7x19odqmtxccea"
const THEME_DARK = "ckhjauub03fyd19otcjzj5qnw"

export const useMapbox = (polyline, style) => {
  const theme = useContext(ThemeContext)
  const [themeKey] = useSwitchTheme()
  const pathColor = theme.colors.secondary.substr(1)
  const polylineEncoded = encodeURIComponent(polyline)
  const themeStyle =
    style || `xuopled/${themeKey === "light" ? THEME_LIGHT : THEME_DARK}`
  return `https://api.mapbox.com/styles/v1/${themeStyle}/static/path+${pathColor}(${polylineEncoded})/auto/500x300@2x?access_token=${TOKEN}&logo=false&attribution=false`
}
