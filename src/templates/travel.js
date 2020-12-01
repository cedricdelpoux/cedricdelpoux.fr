import {FormattedMessage} from "react-intl"
import {graphql} from "gatsby"
import React from "react"

import {AnimationTravel} from "../components/animation-travel"
import {Button} from "../components/button"
import {Link} from "../components/link"
import {Html} from "../components/html"
import {Text} from "../components/text"
import {View} from "../components/view"
import {LayoutPage} from "../layouts/page"
import {useMenu} from "../hooks/use-menu"

export default ({
  data: {
    googleDocs: {
      name: title,
      childMarkdownRemark: {html, excerpt},
    },
  },
  pageContext: {locale},
}) => {
  const menu = useMenu(locale)
  return (
    <LayoutPage title={title} description={excerpt}>
      <View css={{alignSelf: "center"}}>
        <AnimationTravel />
      </View>
      <Html html={html} />
      <View css={{alignSelf: "center"}}>
        <Button as={Link} to={menu.categories.travel.items[0].path}>
          <Text>
            <FormattedMessage id="actions.see-more" />
          </Text>
        </Button>
      </View>
    </LayoutPage>
  )
}

export const pageQuery = graphql`
  query Travel($path: String!) {
    googleDocs(fields: {slug: {eq: $path}}) {
      name
      childMarkdownRemark {
        html
        excerpt
      }
    }
  }
`
