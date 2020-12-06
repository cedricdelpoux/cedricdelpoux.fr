const {IntlProvider} = require("react-intl")
const React = require("react")

const messagesEn = require("./src/translations/en.json")
const messagesFr = require("./src/translations/fr.json")

const messages = {
  fr: messagesFr,
  en: messagesEn,
}

exports.wrapPageElement = ({element, props}) => {
  const locale = props.pageContext.locale || "fr"
  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      {element}
    </IntlProvider>
  )
}
