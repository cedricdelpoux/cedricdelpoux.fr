const baseUrl = "https://climbfinder.com"
const paths = {
  fr: "/fr/montees/",
  en: "/en/climbs/",
}

export const getClimbFinderUrl = ({locale, id}) => {
  return `${baseUrl}${paths[locale]}${id}`
}
