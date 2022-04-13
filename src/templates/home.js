import {graphql} from "gatsby"
import React from "react"
import {FormattedMessage} from "react-intl"

import {AnimationCode} from "../components/animation-code"
import {AnimationSport} from "../components/animation-sport"
import {AnimationTravel} from "../components/animation-travel"
import {Avatar} from "../components/avatar"
import {Button} from "../components/button"
import {Flag} from "../components/flag"
import {Link} from "../components/link"
import {Text} from "../components/text"
import {Title} from "../components/title"
import {View} from "../components/view"
import {useMenu} from "../hooks/use-menu"
import {LayoutPage} from "../layouts/page"

const Home = ({
  data: {
    googleDocs: {
      childMdx: {excerpt, headings},
      text1,
      text2,
      text3,
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
          <Title as="h1">{headings[0].value}</Title>
          <Text css={{textAlign: "justify"}}>{text1}</Text>
          <Button as={Link} to={menu.categories.code.root.path}>
            <FormattedMessage id="actions.see-more" />
          </Button>
        </View>
        <View css={{height: 300}}>
          <AnimationCode />
        </View>
      </View>
      <View
        css={{
          flexDirection: {_: "column", m: "row"},
          alignItems: "center",
        }}
      >
        <View
          css={{
            order: {_: 2, m: 1},
            height: 300,
            mt: {_: 3, m: 0},
            ml: {_: 0, m: 3},
          }}
        >
          <AnimationSport />
        </View>
        <View
          css={{
            order: {_: 1, m: 2},
            flex: 1,
            alignItems: "center",
            gap: 3,
          }}
        >
          <Title as="h1">{headings[1].value}</Title>
          <Text css={{textAlign: "justify"}}>{text2}</Text>
          <Button as={Link} to={menu.categories.sport.root.path}>
            <FormattedMessage id="actions.see-more" />
          </Button>
        </View>
      </View>
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
          <Title as="h1">{headings[2].value}</Title>
          <Text css={{textAlign: "justify"}}>{text3}</Text>
          <Button as={Link} to={menu.categories.travel.root.path}>
            <FormattedMessage id="actions.see-more" />
          </Button>
        </View>
        <View css={{height: 300, flex: 1, width: "100%"}}>
          <AnimationTravel />
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
        excerpt
        headings {
          value
        }
      }
      text1
      text2
      text3
    }
  }
`
