import {ThemeContext} from "css-system"
import {useContext} from "react"
import {useSwitchTheme} from "@css-system/gatsby-plugin-css-system"

const TOKEN = process.env.GATSBY_MAPBOX_TOKEN
const THEME_LIGHT = "ckhj9ux1x2w7x19odqmtxccea"
const THEME_DARK = "ckhjauub03fyd19otcjzj5qnw"

export const useMapbox = (polyline) => {
  const theme = useContext(ThemeContext)
  const [themeKey] = useSwitchTheme()
  const pathColor = theme.colors.secondary.substr(1)
  const polylineEncoded = encodeURIComponent(polyline)
  console.log(polylineEncoded)
  const style = `xuopled/${themeKey === "light" ? THEME_LIGHT : THEME_DARK}`
  return `https://api.mapbox.com/styles/v1/${style}/static/path+${pathColor}(${polylineEncoded})/auto/500x300@2x?access_token=${TOKEN}&logo=false&attribution=false`
}
