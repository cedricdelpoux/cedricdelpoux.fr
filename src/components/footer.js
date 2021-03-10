import {useSwitchTheme} from "@css-system/gatsby-plugin-css-system"
import {
  faGithub,
  faInstagram,
  faStrava,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons"
import {ThemeContext} from "css-system"
import {navigate} from "gatsby"
import {GoogleDocsContext} from "gatsby-source-google-docs"
import React, {useCallback, useContext} from "react"
import {useIntl} from "react-intl"

import {useMenu} from "../hooks/use-menu"
import {Icon} from "./icon"
import {Link} from "./link"
import {Select} from "./select"
import {Text} from "./text"
import {View} from "./view"

export const Footer = () => {
  const intl = useIntl()
  const theme = useContext(ThemeContext)
  const {locale} = useContext(GoogleDocsContext)
  const [themeKey, switchTheme] = useSwitchTheme()
  const handleLocaleChange = useCallback((e) => {
    const newLocale = e.target.value
    const newUrl = newLocale === "en" ? "/en" : "/"
    navigate(newUrl)
  }, [])
  const handleThemeChange = useCallback(
    (e) => {
      const newTheme = e.target.value
      switchTheme(newTheme)
    },
    [switchTheme]
  )

  const menu = useMenu(locale)
  return (
    <View
      as="footer"
      css={{
        gap: 3,
        mx: "auto",
        p: 2,
        maxWidth: theme.breakpoints.m,
        width: "100%",
        color: "#fff",
        "& a:hover": {
          textDecoration: "underline",
        },
      }}
    >
      <View
        css={{
          alignItems: {_: "center", s: "stretch"},
          flexDirection: {_: "column", s: "row"},
          gap: 2,
          justifyContent: {s: "space-between"},
        }}
      >
        <View
          css={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Text as="label">
            {intl.formatMessage({
              id: "footer.theme",
            })}
            <Select value={themeKey} onChange={handleThemeChange}>
              <option value="dark">
                {intl.formatMessage({
                  id: "footer.theme.dark",
                })}
              </option>
              <option value="light">
                {intl.formatMessage({
                  id: "footer.theme.light",
                })}
              </option>
            </Select>
          </Text>
          <Text as="label">
            {intl.formatMessage({
              id: "footer.language",
            })}
            <Select value={locale} onChange={handleLocaleChange}>
              <option value="fr">Français</option>
              <option value="en">English</option>
            </Select>
          </Text>
        </View>
        <View
          css={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 2,
          }}
        >
          <Link to="https://www.strava.com/athletes/229804" title="Strava">
            <Icon icon={faStrava} />
          </Link>
          <Link to="https://github.com/cedricdelpoux" title="Github">
            <Icon icon={faGithub} />
          </Link>
          <Link to="https://twitter.com/cedricdelpoux" title="Twitter">
            <Icon icon={faTwitter} />
          </Link>
          <Link
            to="https://www.youtube.com/channel/UCuyZxPyDBbPYeGneo_7jY4g"
            title="Youtube"
          >
            <Icon icon={faYoutube} />
          </Link>
          <Link to="https://www.instagram.com/cedricdelpoux" title="Instagram">
            <Icon icon={faInstagram} />
          </Link>
        </View>
      </View>
      <View
        css={{
          mt: 0,
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {Object.keys(menu.categories).map((category) => (
          <Links
            key={category}
            root={menu.categories[category].root}
            items={menu.categories[category].items}
          />
        ))}
        <Links
          root={{
            name: intl.formatMessage({
              id: "footer.links",
            }),
          }}
          items={[
            menu.items.about,
            menu.items.contact,
            {name: "RSS", path: "/rss.xml"},
            {
              name: intl.formatMessage({
                id: "footer.sitemap",
              }),
              path: "/sitemap.xml",
            },
          ]}
        />
      </View>
      <View
        css={{
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {intl.formatMessage({
          id: "footer.copyright",
        })}
      </View>
    </View>
  )
}

const Links = ({root, items}) => (
  <View
    css={{gap: 1, px: 1, mt: 2, flexBasis: {_: "100%", s: "50%", m: "25%"}}}
  >
    <View css={{fontWeight: "bold"}}>
      {root.path ? <Link to={root.path}>{root.name}</Link> : root.name}
    </View>
    <View as="ul" css={{borderLeft: "1px solid", pl: 2, my: 0}}>
      {items.map((item) => (
        <View as="li" key={item.path}>
          <View as={Link} to={item.path}>
            {item.name}
          </View>
        </View>
      ))}
    </View>
  </View>
)
