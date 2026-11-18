import "prismjs/themes/prism.css"

import {IntlProvider} from "react-intl"
import React from "react"
import messagesEn from "./src/translations/en.json"
import messagesFr from "./src/translations/fr.json"
import {getLocale} from "./src/utils/locale"

const messages = {
  fr: messagesFr,
  en: messagesEn,
}

export const wrapPageElement = ({element, props}) => {
  const locale = props.pageContext.locale || "fr"
  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      {element}
    </IntlProvider>
  )
}

export const onRouteUpdate = ({location}) => {
  document.documentElement.lang = getLocale(location.pathname)
}
