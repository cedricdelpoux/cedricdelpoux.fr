import {formatDuration, intervalToDuration} from "date-fns"
import {fr} from "date-fns/locale"

const locales = {
  fr,
}

export const diffDates = (start, end, {locale}) => {
  let duration = intervalToDuration({
    start,
    end,
  })

  return formatDuration(duration, {
    format: ["years", "months"],
    locale: locales[locale],
  })
}
