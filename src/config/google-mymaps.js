const turf = require("@turf/turf")
const mapboxPolyline = require("@mapbox/polyline")

const transformMymaps = (node) => {
  // Route
  const route = node.layers
    .sort((a, b) => a.name - b.name)
    .reduce(
      (acc, layer) => [
        ...acc,
        ...layer.lineStrings.reduce(
          (acc, lineString) => [
            ...acc,
            ...lineString.coordinates.map(({latitude, longitude}) => [
              longitude,
              latitude,
            ]),
          ],
          []
        ),
      ],
      []
    )

  // Polyline
  const routeGeoJSON = {
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: route,
    },
  }
  const simple = turf.simplify(routeGeoJSON, {tolerance: 0.01})
  const polyline = mapboxPolyline.fromGeoJSON(simple)
  //
  // // Points
  const points = node.layers
    .reduce((acc, layer) => [...acc, ...layer.points], [])
    .map((point) => {
      const turfPoint = turf.point([
        point.coordinates.longitude,
        point.coordinates.latitude,
      ])
      const turfLine = turf.lineString(route)
      const nearestPointOnLine = turf.nearestPointOnLine(turfLine, turfPoint)
      const [longitude, latitude] = nearestPointOnLine.geometry.coordinates
      const turfPoints = turf.featureCollection(
        route.map((coord) => turf.point(coord))
      )
      const nearestPoint = turf.nearestPoint(nearestPointOnLine, turfPoints)
      const nearestCoordinates = nearestPoint.geometry.coordinates
      const routeIndex = route.findIndex(
        (coord) =>
          coord[0] === nearestCoordinates[0] &&
          coord[1] === nearestCoordinates[1]
      )

      return {
        routeIndex,
        longitude,
        latitude,
      }
    })
    .sort((a, b) => (a.routeIndex > b.routeIndex ? 1 : -1))

  // Tranform
  Object.assign(node, {
    route,
    polyline,
    points,
  })
}

exports.googleMymapsOptions = {
  ids: [
    "1ulgu9lNgtBR0XeNVETN-dIfR2tRAis8q", // Iceland
    "1DovAsh6Wc5Z_YJzvAJVTP57zuKCtfnNX", // Italy
    "1ivT4zEx-Wh0NMrSFXokUe-DX0CnPrX7E", // New Zealand
    "1bWY-eIw_8zH-ZNfNaxyVNO5rqg9v_9yt", // Pyrenees
  ],
  name: "travel",
  transform: transformMymaps,
}
