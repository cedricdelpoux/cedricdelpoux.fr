const metersPerSecondToMinPerKm = (mps) => {
  const mpkm = 16.666666666667 / mps
  const [min, s] = mpkm.toString().split(".")
  return (Number(min) + (60 * Number(`0.${s}`)) / 100).toFixed(2)
}
const metersPerSecondTokmPerHour = (mps) => (3.6 * mps).toFixed(2)
const kmPerHourToMetersPerSecond = (kmh) => (kmh / 3.6).toFixed(2)
const metersToKilometers = (m) => (m / 1000).toFixed(1)
const kilometersToMeters = (km) => (km * 1000).toFixed(1)
const hrssToHrssPerHour = (hrss, duration) =>
  ((hrss / duration) * 60 * 60).toFixed(0)

export {
  metersToKilometers,
  kilometersToMeters,
  hrssToHrssPerHour,
  metersPerSecondToMinPerKm,
  metersPerSecondTokmPerHour,
  kmPerHourToMetersPerSecond,
}
