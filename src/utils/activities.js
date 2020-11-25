export const getMinSpeed = (activities) =>
  Math.floor(
    activities.reduce(
      (min, {activity}) =>
        activity.average_speed < min ? activity.average_speed : min,
      activities[0].activity.average_speed
    )
  )

export const getMaxSpeed = (activities) =>
  Math.ceil(
    activities.reduce(
      (max, {activity}) =>
        activity.average_speed > max ? activity.average_speed : max,
      activities[0].activity.average_speed
    )
  )

export const getMinDistance = (activities) =>
  Math.floor(
    activities.reduce(
      (min, {activity}) => (activity.distance < min ? activity.distance : min),
      activities[0].activity.distance
    )
  )

export const getMaxDistance = (activities) =>
  Math.ceil(
    activities.reduce(
      (max, {activity}) => (activity.distance > max ? activity.distance : max),
      activities[0].activity.distance
    )
  )
