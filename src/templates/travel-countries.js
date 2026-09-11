import {LayoutPage} from "../layouts/page"
import {Masonry} from "../components/masonry"
import {PaperCountry} from "../components/paper-country"
import React from "react"
import {graphql} from "gatsby"

const TravelCountries = ({
  data: {
    countries,
    mdx: {
      excerpt,
      frontmatter: {name: title},
    },
  },
  children,
}) => {
  return (
    <LayoutPage title={title} description={excerpt} body={children}>
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
  query TravelCountries($slug: String!, $locale: String!) {
    mdx(frontmatter: {slug: {eq: $slug}}) {
      excerpt
      frontmatter {
        name
      }
    }
    countries: allMdx(
      filter: {
        frontmatter: {locale: {eq: $locale}, template: {eq: "travel-country"}}
        fields: {photosCount: {gt: 0}}
      }
      sort: {fields: {lastVisitDate: DESC}}
    ) {
      nodes {
        id
        ...PaperCountryFragment
      }
    }
  }
`
