import {graphql} from "gatsby"
import React from "react"

import {Masonry} from "../components/masonry"
import {PaperCountry} from "../components/paper-country"
import {LayoutPage} from "../layouts/page"

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
        {countries.nodes.map(({slug, country, ...rest}) => (
          <PaperCountry key={country} country={country} to={slug} {...rest} />
        ))}
      </Masonry>
    </LayoutPage>
  )
}

export const pageQuery = graphql`
  query TravelCountries($path: String!, $locale: String!) {
    googleDocs(slug: {eq: $path}) {
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
        slug
        ...PaperCountryFragment
      }
    }
  }
`
