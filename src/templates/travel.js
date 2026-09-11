import {graphql} from "gatsby"
import React from "react"
import {FormattedMessage} from "react-intl"

import {AnimationTravel} from "../components/animation-travel"
import {Button} from "../components/button"
import {Html} from "../components/html"
import {Link} from "../components/link"
import {View} from "../components/view"
import {useMenu} from "../hooks/use-menu"
import {LayoutPage} from "../layouts/page"

const Travel = ({
  data: {
    mdx: {
      excerpt,
      frontmatter: {name: title},
    },
  },
  pageContext: {locale},
  children,
}) => {
  const menu = useMenu(locale)
  return (
    <LayoutPage title={title} description={excerpt}>
      <View css={{width: 680, alignSelf: "center"}}>
        <AnimationTravel />
      </View>
      <Html body={children} />
      <View css={{alignSelf: "center"}}>
        <Button
          as={Link}
          to={menu.categories.travel.items[0].path}
          text={<FormattedMessage id="actions.see-more" />}
        />
      </View>
    </LayoutPage>
  )
}

export default Travel

export const pageQuery = graphql`
  query Travel($slug: String!) {
    mdx(frontmatter: {slug: {eq: $slug}}) {
      excerpt
      frontmatter {
        name
      }
    }
  }
`
