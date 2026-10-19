import {tileToCoords} from "gatsby-strava-tiles/utils/tiles"

const nextYearMonth = (yearMonth) => {
  const [year, month] = yearMonth.split("-").map(Number)

  return month === 12
    ? `${year + 1}-01`
    : `${year}-${String(month + 1).padStart(2, "0")}`
}

// Every month from the first to the last of `timeline`, the empty ones
// included, with the count of tiles covered up to it
export const getMonthlyTiles = (timeline) => {
  if (timeline.length === 0) return []

  const monthly = []
  let count = 0
  let index = 0
  let yearMonth = timeline[0].yearMonth
  const last = timeline[timeline.length - 1].yearMonth

  while (yearMonth <= last) {
    const month =
      timeline[index].yearMonth === yearMonth
        ? timeline[index++]
        : {yearMonth, square: monthly[monthly.length - 1].square, new: []}

    count += month.new.length
    monthly.push({...month, count})

    yearMonth = nextYearMonth(yearMonth)
  }

  return monthly
}

export const statusAt = (featureMonth, month) =>
  featureMonth < month ? "old" : featureMonth === month ? "new" : null

// An edge is drawn when it separates two different states, in blue when one
// side is a new tile, in green when it borders the older tiles
const edgeStatus = (a, b) =>
  a === b ? null : a === "new" || b === "new" ? "new" : "old"

const tileKey = ({x, y}) => `${x}-${y}`

// One segment per side of a tile draws the borders without computing the
// outline at each month, which takes a third of a second
export const getTimelineTiles = (monthly) => {
  const tileMonths = new Map()
  const tiles = []
  const tileIdsByMonth = monthly.map((month, monthIndex) =>
    month.new.map((tile) => {
      tileMonths.set(tileKey(tile), monthIndex)
      tiles.push(tile)

      return tiles.length - 1
    })
  )

  const edges = []
  const edgeIdsByMonth = monthly.map(() => [])
  const edgeKeys = new Set()
  const monthOf = (tile) => tileMonths.get(tileKey(tile)) ?? Infinity
  const addEdge = (key, from, to, a, b) => {
    if (edgeKeys.has(key)) return

    const months = [monthOf(a), monthOf(b)]
    const id = edges.length

    edgeKeys.add(key)
    edges.push({months, coordinates: [from, to]})
    new Set(months).forEach(
      (month) => month !== Infinity && edgeIdsByMonth[month].push(id)
    )
  }

  tiles.forEach(({x, y}) => {
    const [bottomRight, topRight, topLeft, bottomLeft] = tileToCoords({x, y})

    addEdge(`h${x}-${y}`, topLeft, topRight, {x, y: y - 1}, {x, y})
    addEdge(`h${x}-${y + 1}`, bottomLeft, bottomRight, {x, y}, {x, y: y + 1})
    addEdge(`v${x}-${y}`, topLeft, bottomLeft, {x: x - 1, y}, {x, y})
    addEdge(`v${x + 1}-${y}`, topRight, bottomRight, {x, y}, {x: x + 1, y})
  })

  return {
    tilesData: {
      type: "FeatureCollection",
      features: tiles.map((tile, id) => ({
        type: "Feature",
        id,
        geometry: {type: "Polygon", coordinates: [tileToCoords(tile)]},
      })),
    },
    tileIdsByMonth,
    getTileState: (id, month) => {
      const {x, y} = tiles[id]

      return {status: statusAt(tileMonths.get(tileKey({x, y})), month)}
    },
    edgesData: {
      type: "FeatureCollection",
      features: edges.map(({coordinates}, id) => ({
        type: "Feature",
        id,
        geometry: {type: "LineString", coordinates},
      })),
    },
    edgeIdsByMonth,
    getEdgeState: (id, month) => {
      const [a, b] = edges[id].months

      return {status: edgeStatus(statusAt(a, month), statusAt(b, month))}
    },
  }
}
