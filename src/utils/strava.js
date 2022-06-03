export const getStravaActivityUrl = (id) => {
  if (!Number.isInteger(id)) return null

  return `https://www.strava.com/activities/${id}`
}

export const stravaAthleteUrl = `https://www.strava.com/athletes/229804`
