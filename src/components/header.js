import {ThemeContext} from "css-system"
import {
  faAddressCard,
  faBars,
  faBiking,
  faCode,
  faEnvelope,
  faGlobeEurope,
  faHome,
  faLightbulb,
  faLightbulbOn,
} from "@fortawesome/pro-light-svg-icons"
import {useLocation} from "@reach/router"
import {useIntl} from "react-intl"
import {useSwitchTheme} from "@css-system/gatsby-plugin-css-system"
import React, {useContext, useState} from "react"

import {Button} from "./button"
import {Flag} from "./flag"
import {Icon} from "./icon"
import {Link} from "./link"
import {Sidebar} from "./sidebar"
import {Text} from "./text"
import {View} from "./view"
import {useMenu} from "../hooks/use-menu"
import IconCed from "../icons/ced.svg"

const CATEGORIES_ICONS = {
  code: faCode,
  sport: faBiking,
  travel: faGlobeEurope,
}
const MENU_ITEM_HEIGHT = "48px"

export const Header = ({locale}) => {
  const theme = useContext(ThemeContext)
  const intl = useIntl()
  const [themeKey, switchTheme] = useSwitchTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const menu = useMenu(locale)
  return (
    <View as="header">
      <View
        as="nav"
        css={{
          mx: "auto",
          px: 2,
          maxWidth: theme.breakpoints.m,
          width: "100%",
          textTransform: "uppercase",
          fontWeight: "bold",
        }}
      >
        <View
          css={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            my: {_: 1, m: 2},
            position: "relative",
          }}
        >
          <View
            css={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              css={{
                width: "30px",
                cursor: "pointer",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() =>
                switchTheme(themeKey === "dark" ? "light" : "dark")
              }
            >
              <Icon
                icon={themeKey === "dark" ? faLightbulb : faLightbulbOn}
                css={{
                  fontSize: 5,
                }}
              />
            </View>
          </View>
          <View
            as={Link}
            to={menu.items.home.path}
            css={{
              "&&": {
                display: "flex",
              },
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              height: MENU_ITEM_HEIGHT,
              fontSize: {_: 3, s: 4},
              gap: 2,
            }}
          >
            <View css={{flex: 1, textAlign: "right"}}>{"Cédric"}</View>
            <View
              as={IconCed}
              css={{
                height: "30px",
                "& path": {
                  stroke: "url(#svg-gradient)",
                },
              }}
            />
            <View css={{flex: 1}}>{"Delpoux"}</View>
          </View>
          <View
            css={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 2,
            }}
          >
            <Icon
              icon={faBars}
              css={{
                cursor: "pointer",
                fontSize: 5,
              }}
              onClick={() => setMenuOpen((open) => !open)}
            />
          </View>
        </View>
        <View
          css={{
            position: "relative",
          }}
        >
          <View
            as="ul"
            css={{
              flexDirection: "row",
              p: 0,
              m: 0,
              gap: 2,
            }}
          >
            {Object.keys(menu.categories).map((category) => (
              <MenuItem
                key={category}
                icon={CATEGORIES_ICONS[category]}
                to={menu.categories[category].root.path}
                label={menu.categories[category].root.name}
                subitems={menu.categories[category].items.map((item) => ({
                  url: item.path,
                  label: item.name,
                }))}
                css={{
                  width: `${100 / Object.keys(menu.categories).length}%`,
                }}
              />
            ))}
          </View>
        </View>
      </View>
      <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)}>
        {locale === "fr" ? (
          <Button as={Link} to="/en">
            <Flag country="united-kingdom" css={{width: "25px"}} />
            <Text>{"English"}</Text>
          </Button>
        ) : (
          <Button as={Link} to="/">
            <Flag country="france" css={{width: "25px"}} />
            <Text>{"Français"}</Text>
          </Button>
        )}
        <View
          as={Link}
          to={menu.items.home.path}
          css={{flexDirection: "row", alignItems: "center", gap: 1}}
        >
          <Icon icon={faHome} gradient />
          <Text>
            {intl.formatMessage({
              id: "header.home",
            })}
          </Text>
        </View>
        <View
          as={Link}
          to={menu.items.about.path}
          css={{flexDirection: "row", alignItems: "center", gap: 1}}
        >
          <Icon icon={faAddressCard} gradient />
          <Text>{menu.items.about.name}</Text>
        </View>
        <View
          as={Link}
          to={menu.items.contact.path}
          css={{flexDirection: "row", alignItems: "center", gap: 1}}
        >
          <Icon icon={faEnvelope} gradient />
          <Text>{menu.items.contact.name}</Text>
        </View>
      </Sidebar>
    </View>
  )
}

const MenuItem = ({to, icon, label, subitems, onClick, css, ...props}) => {
  const theme = useContext(ThemeContext)
  const location = useLocation()
  const active = location.pathname.startsWith(to)
  const exact = location.pathname === to
  return (
    <View
      as="li"
      css={{
        flex: "1 1 auto",
        ...css,
      }}
      onClick={onClick}
      {...props}
    >
      <View
        as={to && Link}
        to={to}
        className={`${active ? "active" : ""} ${exact ? "exact" : ""}`}
        css={{
          "&&": {
            display: "flex",
          },
          alignItems: "center",
          p: 2,
          lineHeight: 1,
          whiteSpace: "nowrap",
          borderRadius: 2,
          overflow: "hidden",
          position: "relative",
          // Submenu
          "& ~ div": {display: "none"},
          // Menu item with submenu
          "&:not(:last-child)": {
            borderBottom: 0,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            "&.active": {
              mb: MENU_ITEM_HEIGHT,
              // Submenu
              "& ~ div": {
                display: "flex",
              },
            },
          },
          // Active item
          "&.active": {
            boxShadow: theme.boxShadow,
            backgroundColor: "backgroundLight",
            "&.exact::after": {
              content: '""',
              background: theme.colors.gradient,
              transitionDuration: theme.transition,
              position: "absolute",
              bottom: "0px",
              left: 0,
              right: 0,
              height: "2px",
            },
          },
          "&:hover": {
            backgroundColor: "backgroundLight",
          },
        }}
      >
        {icon && (
          <Icon
            icon={icon}
            css={{
              fontSize: {_: 5, s: 6},
              mb: 1,
            }}
            gradient
          />
        )}
        {label}
      </View>
      {subitems && subitems.length > 0 && (
        <SubMenu>
          {subitems.map((subitem) => (
            <MenuItem
              key={subitem.url}
              to={subitem.url}
              label={subitem.label}
            />
          ))}
        </SubMenu>
      )}
    </View>
  )
}

const SubMenu = ({css, ...props}) => {
  const theme = useContext(ThemeContext)
  return (
    <View
      css={{
        height: MENU_ITEM_HEIGHT,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: "center",
        backgroundColor: "backgroundLight",
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2,
        boxShadow: theme.boxShadow,
        overflowX: "auto",
        "-webkit-overflow-scrolling": "touch",
        "-ms-overflow-style": "-ms-autohiding-",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        "& > ul > li": {
          flex: {_: "none", s: "1 1 auto"},
          "& > a:last-child": {
            borderRadius: 0,
            boxShadow: "none",
          },
        },
      }}
    >
      <View
        as="ul"
        css={{
          flexDirection: "row",
          m: 0,
          p: 0,
          listStyle: "none",
          ...css,
        }}
        {...props}
      />
    </View>
  )
}
