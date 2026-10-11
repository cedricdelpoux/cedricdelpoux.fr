import {tilesToOutline} from "gatsby-strava-tiles/utils/tiles"

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

const squareTiles = ({x, y, size}) =>
  Array.from({length: size * size}, (_, index) => ({
    x: x + (index % size),
    y: y + Math.floor(index / size),
  }))

// A month of the playback: every tile covered before it in one green area,
// whatever part of the coverage it belongs to, and its new tiles in blue.
// Under the activities, the tiles are filled lighter, so that the tracks
// drawn in the same colors stand out.
export const getMonthTilesLayers = (theme, month, {withActivities} = {}) => {
  if (!month) return []

  return [
    tilesLayer(theme, month.oldTiles(), withActivities ? 0.15 : 0.45),
    newTilesLayer(theme, month.new, withActivities ? 0.25 : 0.6),
    ...(month.square ? [squareLayer(theme, squareTiles(month.square))] : []),
  ]
}

const nextYearMonth = (yearMonth) => {
  const [year, month] = yearMonth.split("-").map(Number)

  return month === 12
    ? `${year + 1}-01`
    : `${year}-${String(month + 1).padStart(2, "0")}`
}

// Every month from the first to the last of `timeline`, the empty ones
// included. The covered tiles are shared by all the months, each one slicing
// the ones before it.
export const getMonthlyTiles = (timeline) => {
  if (timeline.length === 0) return []

  const allTiles = []
  const monthly = []
  let index = 0
  let yearMonth = timeline[0].yearMonth
  const last = timeline[timeline.length - 1].yearMonth

  while (yearMonth <= last) {
    const month =
      timeline[index].yearMonth === yearMonth
        ? timeline[index++]
        : {yearMonth, square: monthly[monthly.length - 1].square, new: []}
    const oldCount = allTiles.length

    allTiles.push(...month.new)
    monthly.push({
      ...month,
      count: allTiles.length,
      oldTiles: () => allTiles.slice(0, oldCount),
    })

    yearMonth = nextYearMonth(yearMonth)
  }

  return monthly
}
