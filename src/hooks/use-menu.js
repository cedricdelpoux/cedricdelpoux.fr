import {graphql, useStaticQuery} from "gatsby"
import {useMemo} from "react"

export const useMenu = (locale = "fr") => {
  const data = useStaticQuery(graphql`
    query MenuQuery {
      fr: allMdx(
        filter: {frontmatter: {locale: {eq: "fr"}, menu: {eq: true}}}
        sort: {frontmatter: {order: ASC}}
      ) {
        nodes {
          frontmatter {
            name
            type
            template
            category
            index
            slug
            order
          }
        }
      }
      en: allMdx(
        filter: {frontmatter: {locale: {eq: "en"}, menu: {eq: true}}}
        sort: {frontmatter: {order: ASC}}
      ) {
        nodes {
          frontmatter {
            name
            type
            template
            category
            index
            slug
            order
          }
        }
      }
    }
  `)

  const menu = useMemo(() => {
    const items = data[locale].nodes.map((node) => node.frontmatter)
    const rawItems = items.filter((item) => !item.category)
    const categoryItems = items.filter((item) => item.category)
    return {
      items: rawItems.reduce(
        (acc, item) => ({
          ...acc,
          [item.type || item.template]: {
            name: item.name,
            path: item.slug,
          },
        }),
        {}
      ),
      categories: categoryItems.reduce((acc, item) => {
        const items = acc[item.category]
          ? {...acc}
          : {
              ...acc,
              [item.category]: {
                root: {},
                items: [],
              },
            }

        if (item.index) {
          items[item.category].root = {name: item.name, path: item.slug}
        } else {
          items[item.category].items.push({
            name: item.name,
            path: item.slug,
            order: item.order,
          })
        }

        return items
      }, {}),
    }
  }, [data, locale])

  return menu
}
