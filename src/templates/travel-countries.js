import {LayoutPage} from "../layouts/page"
import {Masonry} from "../components/masonry"
import {PaperCountry} from "../components/paper-country"
import React from "react"
import {graphql} from "gatsby"

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
      filter: {
        locale: {eq: $locale}
        template: {eq: "travel-country"}
        fields: {photosCount: {gt: 0}}
      }
      sort: {fields: fields___lastVisitDate, order: DESC}
    ) {
      nodes {
        id
        ...PaperCountryFragment
      }
    }
  }
`
