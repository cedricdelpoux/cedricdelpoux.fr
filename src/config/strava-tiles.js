// The activities the sport map shows, the only ones the declutter compares:
// a private or an indoor activity must not hide a public one
const isMapActivity = (activity) =>
  ["Run", "Ride", "Hike"].includes(activity.type) &&
  activity.visibility === "everyone"

exports.isMapActivity = isMapActivity

exports.stravaTilesOptions = {
  // The map of a month must not depend on the later ones, for the timeline
  declutter: {order: "chronological", filter: isMapActivity},
}
