import {graphql} from "gatsby"
import React from "react"

import {AnimationCode} from "../components/animation-code"
import {AnimationSport} from "../components/animation-sport"
import {AnimationTravel} from "../components/animation-travel"
import {Button} from "../components/button"
import {CedricCircle} from "../components/cedric-circle"
import {Html} from "../components/html"
import {LayoutPage} from "../layouts/page"
import {Link} from "../components/link"
import {Text} from "../components/text"
import {View} from "../components/view"
import {useMenu} from "../hooks/use-menu"

export default ({
  data: {
    googleDocs: {
      childMarkdownRemark: {html, excerpt},
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
      <View css={{alignItems: "center", gap: 3}}>
        <CedricCircle />
        <Button as={Link} to={menu.items.about.path}>
          <Text>{menu.items.about.name}</Text>
        </Button>
      </View>
      <Html html={html} fluid />
      <View
        css={{
          flexDirection: {_: "column", m: "row"},
          alignItems: "center",
          gap: 3,
        }}
      >
        <View
          css={{
            alignItems: "center",
            gap: 3,
          }}
        >
          <View css={{height: 300}}>
            <AnimationCode />
          </View>
          <Button as={Link} to={menu.categories.code.root.path}>
            <Text>{menu.categories.code.root.name}</Text>
          </Button>
        </View>
        <View
          css={{
            alignItems: "center",
            gap: 3,
          }}
        >
          <View css={{height: 300}}>
            <AnimationSport />
          </View>
          <Button as={Link} to={menu.categories.sport.root.path}>
            <Text>{menu.categories.sport.root.name}</Text>
          </Button>
        </View>
        <View
          css={{
            alignItems: "center",
            gap: 3,
          }}
        >
          <View css={{height: 300}}>
            <AnimationTravel />
          </View>
          <Button as={Link} to={menu.categories.travel.root.path}>
            <Text>{menu.categories.travel.root.name}</Text>
          </Button>
        </View>
      </View>
    </LayoutPage>
  )
}

export const pageQuery = graphql`
  query Home($path: String!) {
    googleDocs(fields: {slug: {eq: $path}}) {
      childMarkdownRemark {
        html
        excerpt
      }
    }
  }
`
