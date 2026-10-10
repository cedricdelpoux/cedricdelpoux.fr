const {pointsToTiles} = require("gatsby-strava-tiles/utils/tiles")

// Ported from the stravart project, with one change: the activities are
// walked in chronological order rather than by how many tiles they cover (see
// `declutter` below).

// The tracks are not resampled: `coordinates` may come from the simplified
// `summary_polyline`, where two points can be hundreds of meters apart on a
// straight line.
const STEP_METERS = 20
// Under this distance, a point is on a road already drawn: wide enough for
// the GPS drift between two passes, narrow enough not to mistake two parallel
// roads for one.
const NEAR_METERS = 40
// At the edge of a cut, the track is shortened until it is this far from the
// road already drawn: two tracks converging at an angle would otherwise stick
// together for tens of meters before the cut.
const CLEAR_METERS = 80
// A new stretch shorter than this, between two passes on roads already
// drawn, is GPS drift rather than a new road: it is cut along with them.
const MIN_NEW_RUN_METERS = 150
// A shared stretch shorter than this in the middle of a track (a crossing, a
// few meters on the same road) stays drawn: cutting it would chop the track
// up for nothing.
const MIN_CUT_METERS = 150
// Dashes end a cut track right before it joins a road already drawn, to show
// that it goes on. To keep them about the same length on screen, around
// 15 px, whatever the zoom, the end is split into bands of doubling length
// from the cut: the first one is always dashed, each of the next ones is
// dashed under one zoom level less than the previous one.
const STUB_BANDS_METERS = [50, 100, 200, 400, 800, 1600]
// Zoom under which the second band (50 to 100 m) is dashed
const STUB_FIRST_ZOOM = 15
// `dashUntil` of the first band: dashed at every zoom
const ALWAYS_DASHED = 24
// Generalization by zoom: at each of these zooms, a pass is only drawn if it
// is more than GENERALIZE_PIXELS on screen away from everything already drawn
// there, the earlier passes of the same activity included. Otherwise it is
// hidden, at that zoom and below: zoomed out, the map stays a drawing of
// clean lines, all of the same width, without blobs or double lines.
const GENERALIZE_ZOOMS = [12, 11, 10, 9, 8, 7]
const GENERALIZE_PIXELS = 3
// A redundant pass is only hidden if it stays redundant over at least this
// many times the gap: a mere crossing stays drawn.
const GENERALIZE_MIN_RUN_FACTOR = 3
// A bit left visible between two hidden passes, shorter than this, is hidden
// too: it would only be confetti.
const GENERALIZE_MIN_VISIBLE_FACTOR = 2
// An activity is only compared with its own points at least this far behind
// along the track: otherwise every point would be redundant with its
// neighbour.
const GENERALIZE_SELF_GAP_FACTOR = 4
// Meters per pixel at zoom 0 on the equator, with 512 px Mapbox tiles
const METERS_PER_PIXEL_Z0 = 78271.5

// Simplification tolerance of the tracks: invisible on screen, but a track
// from the `latlng` stream goes from thousands of points to a few hundred.
const SIMPLIFY_METERS = 3

const METERS_PER_DEGREE = 111320

const toMeters = ([lng, lat]) => [
  lng * METERS_PER_DEGREE * Math.cos((lat * Math.PI) / 180),
  lat * METERS_PER_DEGREE,
]

const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y)

// A point every STEP_METERS, each one tied to its original segment (`seg`)
// so that the track can be cut without losing its vertices.
function densify(coordinates) {
  const points = []

  coordinates.forEach((coord, index) => {
    const [x, y] = toMeters(coord)
    const point = {coord, x, y, seg: index}

    if (index > 0) {
      const prev = points[points.length - 1]
      const steps = Math.floor(distance(prev, point) / STEP_METERS)
      const [prevLng, prevLat] = coordinates[index - 1]
      const [lng, lat] = coord

      for (let step = 1; step < steps; step++) {
        const t = step / steps
        points.push({
          coord: [prevLng + (lng - prevLng) * t, prevLat + (lat - prevLat) * t],
          x: prev.x + (x - prev.x) * t,
          y: prev.y + (y - prev.y) * t,
          seg: index - 1,
        })
      }
    }

    points.push(point)
  })

  return points
}

// Hash grid of the points already drawn, in cells of `cellSize` meters: a
// near point can only be in a neighbouring cell.
function createTrace(cellSize = NEAR_METERS) {
  const cells = new Map()
  const keyOf = (cx, cy) => `${cx}:${cy}`

  return {
    add(point) {
      const key = keyOf(
        Math.floor(point.x / cellSize),
        Math.floor(point.y / cellSize)
      )
      if (!cells.has(key)) cells.set(key, [])
      cells.get(key).push(point)
    },
    isNear(point, radius = NEAR_METERS) {
      const cx = Math.floor(point.x / cellSize)
      const cy = Math.floor(point.y / cellSize)
      const reach = Math.ceil(radius / cellSize)

      for (let dx = -reach; dx <= reach; dx++) {
        for (let dy = -reach; dy <= reach; dy++) {
          const cell = cells.get(keyOf(cx + dx, cy + dy))
          if (cell && cell.some((other) => distance(point, other) <= radius)) {
            return true
          }
        }
      }

      return false
    },
  }
}

// The consecutive stretches of points all covered, or all new
function getRuns(points, covered) {
  const runs = []

  points.forEach((point, i) => {
    const last = runs[runs.length - 1]

    if (last && last.covered === covered[i]) {
      last.end = i
      last.length += distance(points[i - 1], point)
    } else {
      runs.push({covered: covered[i], start: i, end: i, length: 0})
    }
  })

  return runs
}

function mergeRuns(runs) {
  return runs.reduce((merged, run) => {
    const last = merged[merged.length - 1]

    if (last && last.covered === run.covered) {
      last.end = run.end
      last.length += run.length
    } else {
      merged.push({...run})
    }

    return merged
  }, [])
}

// The ranges of indices to draw: everything not drawn yet, without the GPS
// drifts nor the shared stretches too short to be worth a cut.
function getKeptRanges(points, covered) {
  let runs = getRuns(points, covered)

  if (runs.every((run) => !run.covered)) return [[0, points.length - 1]]

  runs = mergeRuns(
    runs.map((run) =>
      !run.covered && run.length < MIN_NEW_RUN_METERS
        ? {...run, covered: true}
        : run
    )
  )
  runs = mergeRuns(
    runs.map((run, i) =>
      run.covered && i > 0 && i < runs.length - 1 && run.length < MIN_CUT_METERS
        ? {...run, covered: false}
        : run
    )
  )

  return runs.filter((run) => !run.covered).map((run) => [run.start, run.end])
}

// Moves the cut ends of a range back until they are CLEAR_METERS away from
// the road already drawn. An end that is the start or the end of the
// activity does not move. Returns null if nothing is left.
function clearRange(points, trace, [start, end]) {
  let first = start
  let last = end

  if (start > 0) {
    while (first < last && trace.isNear(points[first], CLEAR_METERS)) first++
  }
  if (end < points.length - 1) {
    while (last > first && trace.isNear(points[last], CLEAR_METERS)) last--
  }

  return first < last ? [first, last] : null
}

const round = (value) => Math.round(value * 1e5) / 1e5

// Iterative Douglas-Peucker, on the coordinates projected in meters
function simplify(coordinates) {
  if (coordinates.length < 3) return coordinates

  const projected = coordinates.map(toMeters)
  const keep = new Uint8Array(coordinates.length)
  keep[0] = keep[coordinates.length - 1] = 1
  const stack = [[0, coordinates.length - 1]]

  while (stack.length > 0) {
    const [first, last] = stack.pop()
    const [ax, ay] = projected[first]
    const [bx, by] = projected[last]
    const dx = bx - ax
    const dy = by - ay
    const lengthSquared = dx * dx + dy * dy
    let maxDistance = 0
    let index = -1

    for (let i = first + 1; i < last; i++) {
      const [px, py] = projected[i]
      const t =
        lengthSquared === 0
          ? 0
          : Math.max(
              0,
              Math.min(1, ((px - ax) * dx + (py - ay) * dy) / lengthSquared)
            )
      const d = Math.hypot(px - ax - t * dx, py - ay - t * dy)

      if (d > maxDistance) {
        maxDistance = d
        index = i
      }
    }

    if (maxDistance > SIMPLIFY_METERS) {
      keep[index] = 1
      stack.push([first, index], [index, last])
    }
  }

  return coordinates
    .filter((_, i) => keep[i])
    .map(([lng, lat]) => [round(lng), round(lat)])
}

// The track between the points `start` and `end`: both cut points and the
// original vertices between them
function slice(coordinates, points, start, end) {
  const result = [points[start].coord]

  for (let seg = points[start].seg + 1; seg <= points[end].seg; seg++) {
    result.push(coordinates[seg])
  }

  const last = points[end].coord
  const prev = result[result.length - 1]
  if (last[0] !== prev[0] || last[1] !== prev[1]) result.push(last)

  return simplify(result)
}

// Cumulative distance along the track, in meters, at each point
function getCumulative(points) {
  const cumulative = [0]

  for (let i = 1; i < points.length; i++) {
    cumulative.push(cumulative[i - 1] + distance(points[i - 1], points[i]))
  }

  return cumulative
}

// `dashUntil` of a dash band `meters` away from the cut, 0 past the last band
function bandDash(meters) {
  const band = STUB_BANDS_METERS.findIndex((limit) => meters < limit)

  if (band === -1) return 0

  return band === 0 ? ALWAYS_DASHED : STUB_FIRST_ZOOM + 1 - band
}

// For each point of a range, the zoom under which it is dashed because it is
// near a cut. Between two cuts, each point depends on the closest one: a
// short range ends up fully dashed when zooming out.
function getBandDashes(points, cumulative, [start, end], dashes) {
  const cutBefore = start > 0
  const cutAfter = end < points.length - 1

  for (let i = start; i <= end; i++) {
    const fromCut = Math.min(
      cutBefore ? cumulative[i] - cumulative[start] : Infinity,
      cutAfter ? cumulative[end] - cumulative[i] : Infinity
    )

    dashes[i] = Math.max(dashes[i], bandDash(fromCut))
  }
}

// One grid per zoom of GENERALIZE_ZOOMS, of the points drawn at that zoom, in
// cells of the gap allowed on the equator, the widest: anywhere else the gap
// is smaller and always fits in the neighbouring cells.
function createGeneralizeLevels() {
  return GENERALIZE_ZOOMS.map((zoom) => {
    const cellSize = (GENERALIZE_PIXELS * METERS_PER_PIXEL_Z0) / 2 ** zoom

    return {
      zoom,
      cellSize,
      grid: createTrace(cellSize),
      // A point every quarter of the gap is enough: at zoom 7, the grid
      // would otherwise hold thousands of points per cell
      every: Math.max(1, Math.floor(cellSize / 4 / STEP_METERS)),
    }
  })
}

// The stretches of `ranges` where `test(i)` is true, with their length
function getMatchingRuns(ranges, cumulative, test) {
  const runs = []

  ranges.forEach(([start, end]) => {
    let runStart = -1

    for (let i = start; i <= end + 1; i++) {
      if (i <= end && test(i)) {
        if (runStart === -1) runStart = i
        continue
      }

      if (runStart !== -1) {
        runs.push({
          start: runStart,
          end: i - 1,
          length: cumulative[i - 1] - cumulative[runStart],
          // Bordered on both sides by something else than the range's ends
          isInner: runStart > start && i - 1 < end,
        })
      }
      runStart = -1
    }
  })

  return runs
}

// For each point, `hides[i]`: the zoom under which it is hidden, because it
// falls less than GENERALIZE_PIXELS away from a line already drawn. The zooms
// go from the closest to the farthest: a point hidden at a zoom is hidden
// below it too.
function generalize(points, cumulative, ranges, levels, hides) {
  const cosLatitude = Math.cos((points[ranges[0][0]].coord[1] * Math.PI) / 180)

  levels.forEach(({zoom, cellSize, grid, every}) => {
    const radius =
      (GENERALIZE_PIXELS * METERS_PER_PIXEL_Z0 * cosLatitude) / 2 ** zoom
    const self = createTrace(cellSize)
    const behind = []
    const near = new Uint8Array(points.length)

    // Asked one point out of `every`, the answer holds for the whole block
    ranges.forEach(([start, end]) => {
      for (let i = start; i <= end; i += every) {
        if (hides[i]) continue

        while (
          behind.length > 0 &&
          cumulative[i] - cumulative[behind[0]] >
            GENERALIZE_SELF_GAP_FACTOR * radius
        ) {
          self.add(points[behind.shift()])
        }

        const isNear =
          grid.isNear(points[i], radius) || self.isNear(points[i], radius)

        for (let j = i; j < Math.min(i + every, end + 1); j++) near[j] = isNear
        if (!isNear) behind.push(i)
      }
    })

    getMatchingRuns(ranges, cumulative, (i) => !hides[i] && near[i])
      .filter((run) => run.length >= GENERALIZE_MIN_RUN_FACTOR * radius)
      .forEach(({start, end}) => {
        for (let i = start; i <= end; i++) hides[i] = zoom + 1
      })

    getMatchingRuns(ranges, cumulative, (i) => !hides[i])
      .filter(
        (run) =>
          run.isInner && run.length < GENERALIZE_MIN_VISIBLE_FACTOR * radius
      )
      .forEach(({start, end}) => {
        for (let i = start; i <= end; i++) hides[i] = zoom + 1
      })

    ranges.forEach(([start, end]) => {
      for (let i = start; i <= end; i += every) {
        if (!hides[i]) grid.add(points[i])
      }
    })
  })
}

// Splits a range in pieces of the same `dashUntil` and `hideUntil`: solid at
// every zoom in `parts`, the others in `stubs`. Two neighbouring pieces share
// their junction point, so the track stays continuous.
function splitRange(
  coordinates,
  points,
  [start, end],
  dashes,
  hides,
  parts,
  stubs
) {
  const sameAs = (i, j) => dashes[i] === dashes[j] && hides[i] === hides[j]
  let runStart = start

  for (let i = start + 1; i <= end; i++) {
    if (i < end && sameAs(i, runStart)) continue

    const line = slice(coordinates, points, runStart, i)
    const dashUntil = dashes[runStart]
    const hideUntil = hides[runStart]

    if (dashUntil === 0 && hideUntil === 0) parts.push(line)
    else stubs.push({dashUntil, hideUntil, coordinates: line})

    runStart = i
  }
}

// Picks the activities to draw and cuts what they have in common.
//
// 1. Selection: in chronological order, an activity is kept if it covers at
//    least one tile no earlier activity covered -- the new tiles counter of
//    gatsby-strava-tiles. Stravart picks the activity covering the most new
//    tiles first instead, whatever its date: here, an activity only ever
//    depends on the ones before it, so the map of a given month is exactly
//    the declutter of every activity up to that month, without holes left by
//    a later activity.
// 2. Cut: each track loses the parts following a road already drawn by the
//    earlier ones, at its start, its end and in the middle, to draw a single
//    track per road. The last meters before each cut are dashed (`stubs`), to
//    show that the track goes on without doubling the road already drawn.
//    Only the pieces going through a tile the activity brings are kept.
// 3. Zoom: from 12 to 7, the passes falling a few pixels away from a line
//    already drawn, their own included, are hidden (see `generalize`). A
//    track is not cut against itself: an out-and-back stays drawn twice.
//
// Stravart also trims, once every track is known, the ends of an activity
// following the track of a later one. That would make a month depend on the
// next ones, so it is left out.
function declutter(activities) {
  const sorted = activities
    .filter((activity) => activity.coordinates?.length > 1)
    .sort((a, b) => (a.start_date < b.start_date ? -1 : 1))

  const coveredTiles = new Set()
  const trace = createTrace()
  const levels = createGeneralizeLevels()
  const results = new Map()

  sorted.forEach((activity) => {
    const {coordinates} = activity
    const tiles = pointsToTiles(coordinates).map(({x, y}) => `${x}-${y}`)
    const newTiles = new Set(tiles.filter((tile) => !coveredTiles.has(tile)))

    tiles.forEach((tile) => coveredTiles.add(tile))

    if (newTiles.size === 0) {
      results.set(activity.id, {hidden: true, reason: "no-new-tiles"})
      return
    }

    const points = densify(coordinates)
    const covered = points.map((point) => trace.isNear(point))
    // A piece going through none of the tiles the activity brings does not
    // serve the coverage: it is not drawn, and the road stays free for a
    // later activity.
    const ranges = getKeptRanges(points, covered)
      .map((range) => clearRange(points, trace, range))
      .filter(
        (range) =>
          range &&
          pointsToTiles(
            points.slice(range[0], range[1] + 1).map(({coord}) => coord)
          ).some(({x, y}) => newTiles.has(`${x}-${y}`))
      )

    if (ranges.length === 0) {
      results.set(activity.id, {hidden: true, reason: "already-traced"})
      return
    }

    ranges.forEach(([start, end]) => {
      for (let i = start; i <= end; i++) trace.add(points[i])
    })

    const cumulative = getCumulative(points)
    const dashes = new Uint8Array(points.length)
    const hides = new Uint8Array(points.length)
    const parts = []
    const stubs = []

    ranges.forEach((range) => getBandDashes(points, cumulative, range, dashes))
    generalize(points, cumulative, ranges, levels, hides)
    ranges.forEach((range) =>
      splitRange(coordinates, points, range, dashes, hides, parts, stubs)
    )

    results.set(activity.id, {hidden: false, reason: null, parts, stubs})
  })

  return results
}

module.exports = {declutter, simplify}
