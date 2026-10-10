import {distinctTiles, tilesToOutline} from "gatsby-strava-tiles/utils/tiles"

// Only the two theme colors: the covered tiles in green, the month's new
// tiles in blue, and the max square as a bare blue border on top of them.
// Each layer is the props of a `SportTilesMapLayer`.
const tilesLayer = (theme, tiles, fillOpacity) => ({
  id: "tiles",
  outline: tilesToOutline(tiles),
  color: theme.colors.secondary,
  fillOpacity,
  lineOpacity: 1,
  lineWidth: 1.5,
})

const newTilesLayer = (theme, tiles, fillOpacity) => ({
  id: "new",
  outline: tilesToOutline(tiles),
  color: theme.colors.primary,
  fillOpacity,
  lineOpacity: 1,
  lineWidth: 1.5,
})

const squareLayer = (theme, tiles) => ({
  id: "square",
  outline: tilesToOutline(tiles),
  color: theme.colors.primary,
  fillOpacity: 0,
  lineOpacity: 1,
  lineWidth: 2,
})

// A month of the playback: every tile covered before it in one green area,
// whatever part of the coverage it belongs to, and its new tiles in blue.
// Under the activities, the tiles are filled lighter, so that the tracks
// drawn in the same colors stand out.
export const getMonthTilesLayers = (theme, parts, {withActivities} = {}) => {
  if (!parts) return []

  const oldTiles = [...parts.square, ...parts.cluster, ...parts.rest].filter(
    distinctTiles(parts.new)
  )

  return [
    tilesLayer(theme, oldTiles, withActivities ? 0.15 : 0.45),
    newTilesLayer(theme, parts.new, withActivities ? 0.25 : 0.6),
    squareLayer(theme, parts.square),
  ]
}

const nextYearMonth = (yearMonth) => {
  const [year, month] = yearMonth.split("-").map(Number)

  return month === 12
    ? `${year + 1}-01`
    : `${year}-${String(month + 1).padStart(2, "0")}`
}

// `monthly` only has the months with an activity. Every month in between is
// added with the coverage of the previous one and no new tile, so that a
// month takes the same room on a timeline whether anything happened in it or
// not.
export const fillMonthly = (monthly) => {
  if (monthly.length === 0) return monthly

  const filled = []
  let index = 0
  let yearMonth = monthly[0].yearMonth
  const last = monthly[monthly.length - 1].yearMonth

  while (yearMonth <= last) {
    if (monthly[index].yearMonth === yearMonth) {
      filled.push(monthly[index])
      index++
    } else {
      const {parts} = filled[filled.length - 1]

      filled.push({yearMonth, parts: {...parts, new: []}})
    }

    yearMonth = nextYearMonth(yearMonth)
  }

  return filled
}
