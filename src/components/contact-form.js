import {faPaperPlane} from "@fortawesome/pro-light-svg-icons"
import {useLocation} from "@reach/router"
import {ThemeContext} from "css-system"
import {navigate} from "gatsby-link"
import {GoogleDocsContext} from "gatsby-source-google-docs"
import React, {useCallback, useContext} from "react"
import {FormattedMessage} from "react-intl"
import {animated} from "react-spring"

import {useMenu} from "../hooks/use-menu"
import {Button} from "./button"
import {Text} from "./text"
import {View} from "./view"

const Label = ({css, children, ...props}) => (
  <View
    as="label"
    css={{
      alignItems: "flex-start",
      gap: 1,
      ...css,
    }}
    {...props}
  >
    {children}
  </View>
)

const Input = ({css, as = "input", ...props}) => {
  const theme = useContext(ThemeContext)
  return (
    <View
      as={as}
      type="text"
      css={{
        fontFamily: "inherit",
        p: 1,
        boxShadow: theme.boxShadow,
        outline: "none",
        color: "text",
        backgroundColor: "backgroundLight",
        border: "2px solid",
        borderColor: "transparent",
        fontSize: 4,
        width: "100%",
        "&:focus": {
          borderImage: theme.colors.gradient,
          borderImageSlice: 1,
        },
        ...css,
      }}
      {...props}
    />
  )
}

const encode = (data) =>
  Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")

export const ContactForm = () => {
  const {locale} = useContext(GoogleDocsContext)
  const menu = useMenu(locale)
  const location = useLocation()
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      const form = e.target

      fetch(location.pathname, {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: encode({
          "form-name": form.getAttribute("name"),
          email: form.email.value,
          name: form.name.value,
          message: form.message.value,
        }),
      })
        .then(() => navigate(form.getAttribute("action")))
        .catch((error) => alert(error))
    },
    [location]
  )

  return (
    <View
      as={animated.form}
      method="post"
      action={menu.items["contact-success"].path}
      css={{
        alignSelf: "center",
        width: {_: "100%", s: "400px"},
        gap: 2,
        fontSize: "4",
      }}
      name="contact"
      data-netlify="true"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value="contact" />
      <Label>
        <Text gradient css={{fontWeight: "bold"}}>
          <FormattedMessage id="contact.form.email" />
        </Text>
        <Input type="email" name="email" />
      </Label>
      <Label>
        <Text gradient css={{fontWeight: "bold"}}>
          <FormattedMessage id="contact.form.name" />
        </Text>
        <Input name="name" />
      </Label>
      <Label>
        <Text gradient css={{fontWeight: "bold"}}>
          <FormattedMessage id="contact.form.message" />
        </Text>
        <Input
          as="textarea"
          name="message"
          css={{resize: "none", height: 200}}
        />
      </Label>
      <Button type="submit" css={{alignSelf: "center"}} icon={faPaperPlane}>
        <Text>
          <FormattedMessage id="actions.send" />
        </Text>
      </Button>
    </View>
  )
}
