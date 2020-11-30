import {graphql} from "gatsby"
import React from "react"

import {LayoutPage} from "../layouts/page"
import {Masonry} from "../components/masonry"
import {PaperStory} from "../components/paper-story"

export default ({
  data: {
    stories,
    googleDocs: {
      name: title,
      childMarkdownRemark: {html, excerpt},
    },
  },
}) => {
  return (
    <LayoutPage title={title} description={excerpt} html={html}>
      <Masonry>
        {stories.nodes.map((node) => (
          <PaperStory key={node.id} {...node} />
        ))}
      </Masonry>
    </LayoutPage>
  )
}

export const pageQuery = graphql`
  query TravelStories($path: String!, $locale: String!) {
    googleDocs(fields: {slug: {eq: $path}}) {
      name
      childMarkdownRemark {
        html
        excerpt
      }
    }
    stories: allGoogleDocs(
      sort: {fields: date, order: DESC}
      filter: {template: {eq: "travel-story"}, locale: {eq: $locale}}
    ) {
      nodes {
        fields {
          slug
        }
        ...PaperStoryFragment
      }
    }
  }
`
