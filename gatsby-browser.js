import "prismjs/themes/prism.css"

export const onClientEntry = () => {
  // IntersectionObserver polyfill
  if (!(`IntersectionObserver` in window)) {
    import(`intersection-observer`)
  }
}

import {IntlProvider} from "react-intl"
import React from "react"
import messagesEn from "./src/translations/en.json"
import messagesFr from "./src/translations/fr.json"

const messages = {
  fr: messagesFr,
  en: messagesEn,
}

export const wrapPageElement = ({element, props}) => {
  const locale = props.pageContext.locale || "fr"
  return (
    <IntlProvider
      locale={locale}
      messages={messages[locale]}
      onError={(err) => {
        if (err.code === "MISSING_TRANSLATION") {
          return
        }
        throw err
      }}
    >
      {element}
    </IntlProvider>
  )
}
