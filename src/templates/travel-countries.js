import {graphql} from "gatsby"
import React from "react"

import {Masonry} from "../components/masonry"
import {PaperCountry} from "../components/paper-country"
import {LayoutPage} from "../layouts/page"

const TravelCountries = ({
  data: {
    countries,
    googleDocs: {
      name: title,
      childMdx: {body, excerpt},
    },
  },
}) => {
  return (
    <LayoutPage title={title} description={excerpt} body={body}>
      <Masonry>
        {countries.nodes.map((node) => (
          <PaperCountry key={node.id} {...node} />
        ))}
      </Masonry>
    </LayoutPage>
  )
}

export default TravelCountries

export const pageQuery = graphql`
  query TravelCountries($path: String!, $locale: String!) {
    googleDocs(slug: {eq: $path}) {
      name
      childMdx {
        body
        excerpt
      }
    }
    countries: allGoogleDocs(
      filter: {locale: {eq: $locale}, template: {eq: "travel-country"}}
      sort: {fields: album___latestDate, order: DESC}
    ) {
      nodes {
        id
        ...PaperCountryFragment
      }
    }
  }
`
