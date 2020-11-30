const mapboxPolyline = require("@mapbox/polyline")

exports.transformStravaActivity = (activity) => {
  if (activity.map) {
    activity.map.geoJSON = mapboxPolyline.toGeoJSON(
      activity.map.summary_polyline
    )
  }
}
