import {graphql} from "gatsby"
import React from "react"

import {Grid} from "../components/grid"
import {PaperStory} from "../components/paper-story"
import {LayoutPage} from "../layouts/page"

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
      <Grid>
        {stories.nodes.map((node) => (
          <PaperStory key={node.id} {...node} />
        ))}
      </Grid>
    </LayoutPage>
  )
}

export const pageQuery = graphql`
  query TravelStories($path: String!, $locale: String!) {
    googleDocs(slug: {eq: $path}) {
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
        id
        ...PaperStoryFragment
      }
    }
  }
`
