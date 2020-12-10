import {graphql, useStaticQuery} from "gatsby"
import {useMemo} from "react"

export const useMenu = (locale = "fr") => {
  const data = useStaticQuery(graphql`
    query MenuQuery {
      fr: allGoogleDocs(
        filter: {locale: {eq: "fr"}, menu: {eq: true}}
        sort: {fields: order}
      ) {
        nodes {
          name
          type
          template
          category
          index
          slug
        }
      }
      en: allGoogleDocs(
        filter: {locale: {eq: "en"}, menu: {eq: true}}
        sort: {fields: order}
      ) {
        nodes {
          name
          type
          template
          category
          index
          slug
        }
      }
    }
  `)

  const menu = useMemo(() => {
    const rawItems = data[locale].nodes.filter((item) => !item.category)
    const categoryItems = data[locale].nodes.filter((item) => item.category)
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
