import {graphql} from "gatsby"
import React from "react"

import {LayoutPage} from "../layouts/page"
import {Masonry} from "../components/masonry"
import {PaperCountry} from "../components/paper-country"

export default ({
  data: {
    countries,
    googleDocs: {
      name: title,
      childMarkdownRemark: {html, excerpt},
    },
  },
}) => {
  return (
    <LayoutPage title={title} description={excerpt} html={html}>
      <Masonry>
        {countries.nodes.map(({fields: {slug}, country, ...rest}) => (
          <PaperCountry key={country} country={country} to={slug} {...rest} />
        ))}
      </Masonry>
    </LayoutPage>
  )
}

export const pageQuery = graphql`
  query TravelCountry($path: String!, $locale: String!) {
    googleDocs(fields: {slug: {eq: $path}}) {
      name
      childMarkdownRemark {
        html
        excerpt
      }
    }
    countries: allGoogleDocs(
      filter: {locale: {eq: $locale}, template: {eq: "travel-country"}}
    ) {
      nodes {
        fields {
          slug
        }
        ...PaperCountry
      }
    }
  }
`
