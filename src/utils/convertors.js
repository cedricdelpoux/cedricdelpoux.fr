const metersPerSecondToMinPerKm = (mps) => {
  const mpkm = 16.666666666667 / mps
  const [min, s] = mpkm.toString().split(".")
  return Number((Number(min) + (60 * Number(`0.${s}`)) / 100).toFixed(2))
}
const metersPerSecondTokmPerHour = (mps) => Number((3.6 * mps).toFixed(2))
const kmPerHourToMetersPerSecond = (kmh) => Number((kmh / 3.6).toFixed(2))
const metersToKilometers = (m, precision = 1) =>
  Number((m / 1000).toFixed(precision))
const kilometersToMeters = (km) => Number((km * 1000).toFixed(1))
const hrssToHrssPerHour = (hrss, duration) =>
  Number(((hrss / duration) * 60 * 60).toFixed(0))

export {
  metersToKilometers,
  kilometersToMeters,
  hrssToHrssPerHour,
  metersPerSecondToMinPerKm,
  metersPerSecondTokmPerHour,
  kmPerHourToMetersPerSecond,
}
