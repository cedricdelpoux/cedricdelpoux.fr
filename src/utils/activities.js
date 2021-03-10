import {metersPerSecondTokmPerHour, metersToKilometers} from "./convertors"

export const getMinSpeed = (activities) =>
  Math.floor(
    metersPerSecondTokmPerHour(
      activities.reduce(
        (min, activity) =>
          activity.average_speed < min ? activity.average_speed : min,
        activities[0].average_speed
      )
    )
  )

export const getMaxSpeed = (activities) =>
  Math.ceil(
    metersPerSecondTokmPerHour(
      activities.reduce(
        (max, activity) =>
          activity.average_speed > max ? activity.average_speed : max,
        activities[0].average_speed
      )
    )
  )

export const getMinDistance = (activities) =>
  Math.floor(
    metersToKilometers(
      activities.reduce(
        (min, activity) => (activity.distance < min ? activity.distance : min),
        activities[0].distance
      )
    )
  )

export const getMaxDistance = (activities) =>
  Math.ceil(
    metersToKilometers(
      activities.reduce(
        (max, activity) => (activity.distance > max ? activity.distance : max),
        activities[0].distance
      )
    )
  )
