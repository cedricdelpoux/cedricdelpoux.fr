const toString = (number) => (number < 10 ? "0" : "") + number

const secondsToString = (d) => {
  d = Number(d)
  const h = Math.floor(d / 3600)
  const m = Math.floor((d % 3600) / 60)
  const s = Math.floor((d % 3600) % 60)

  const hDisplay = h > 0 ? toString(h) + "h" : ""
  const mDisplay = m > 0 ? toString(m) + "m" : ""
  const sDisplay = toString(s) + "s"
  return hDisplay + mDisplay + sDisplay
}

const secondsToHms = (d) => {
  d = Number(d)
  const h = toString(Math.floor(d / 3600))
  const m = toString(Math.floor((d % 3600) / 60))
  const s = toString(Math.floor((d % 3600) % 60))

  return {h, m, s}
}

export {secondsToString, secondsToHms}
