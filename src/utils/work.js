import keepinsportLogo from "../icons/jobs/keepinsport-square.svg"
import livingobjectsLogo from "../icons/jobs/livingobjects-square.svg"
import overblogLogo from "../icons/jobs/overblog-square.svg"
import shipfixLogo from "../icons/jobs/shipfix-square.svg"

const logos = {
  overblog: overblogLogo,
  shipfix: shipfixLogo,
  livingobjects: livingobjectsLogo,
  keepinsport: keepinsportLogo,
}

export const getWorkCompanyLogo = (company) => {
  if (!company || !logos[company.toLowerCase()]) return null

  return logos[company.toLowerCase()]
}
