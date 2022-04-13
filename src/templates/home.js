import {graphql} from "gatsby"
import React from "react"
import {FormattedMessage} from "react-intl"

import {AnimationCode} from "../components/animation-code"
import {AnimationSport} from "../components/animation-sport"
import {AnimationTravel} from "../components/animation-travel"
import {Avatar} from "../components/avatar"
import {Button} from "../components/button"
import {Flag} from "../components/flag"
import {Html} from "../components/html"
import {Link} from "../components/link"
import {Text} from "../components/text"
import {View} from "../components/view"
import {useMenu} from "../hooks/use-menu"
import {LayoutPage} from "../layouts/page"

const Home = ({
  data: {
    googleDocs: {
      childMdx: {body, excerpt},
    },
  },
  pageContext: {locale},
}) => {
  const menu = useMenu(locale)
  return (
    <LayoutPage
      title="Cédric Delpoux"
      description={excerpt}
      css={{alignItems: "center"}}
    >
      <View
        css={{
          flexDirection: {_: "column", m: "row"},
          alignItems: "center",
          gap: 3,
        }}
      >
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
        <Avatar />
        <Button as={Link} to={menu.items.about.path}>
          {menu.items.about.name}
        </Button>
      </View>
      <Html body={body} fluid />
      <View
        css={{
          flexDirection: {_: "column", m: "row"},
          alignItems: "center",
          gap: 3,
        }}
      >
        <View
          css={{
            flex: 1,
            alignItems: "center",
            gap: 3,
          }}
        >
          <Button as={Link} to={menu.categories.code.root.path}>
            <FormattedMessage id="actions.see-more" />
          </Button>
          <View css={{height: 300}}>
            <AnimationCode />
          </View>
          <Button as={Link} to={menu.categories.code.root.path}>
            <Text>{menu.categories.code.root.name}</Text>
          </Button>
        </View>
        <View
          css={{
            flex: 1,
            alignItems: "center",
            gap: 3,
          }}
        >
          <View css={{height: 300}}>
            <AnimationSport />
          </View>
          <Button as={Link} to={menu.categories.sport.root.path}>
            <FormattedMessage id="actions.see-more" />
          </Button>
        </View>
        <View
          css={{
            flex: 1,
            alignItems: "center",
            gap: 3,
          }}
        >
          <View css={{height: 300}}>
            <AnimationTravel />
          </View>
          <Button as={Link} to={menu.categories.travel.root.path}>
            <FormattedMessage id="actions.see-more" />
          </Button>
        </View>
      </View>
    </LayoutPage>
  )
}

export default Home

export const pageQuery = graphql`
  query Home($path: String!) {
    googleDocs(slug: {eq: $path}) {
      childMdx {
        body
        excerpt
      }
    }
  }
`
