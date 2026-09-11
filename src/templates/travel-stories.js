import {graphql} from "gatsby"
import React from "react"

import {Grid} from "../components/grid"
import {PaperStory} from "../components/paper-story"
import {LayoutPage} from "../layouts/page"

const TravelStories = ({
  data: {
    stories,
    mdx: {
      excerpt,
      frontmatter: {name: title},
    },
  },
  children,
}) => {
  return (
    <LayoutPage title={title} description={excerpt} body={children}>
      <Grid>
        {stories.nodes.map((node) => (
          <PaperStory key={node.id} {...node} flag />
        ))}
      </Grid>
    </LayoutPage>
  )
}

export default TravelStories

export const pageQuery = graphql`
  query TravelStories($slug: String!, $locale: String!) {
    mdx(frontmatter: {slug: {eq: $slug}}) {
      excerpt
      frontmatter {
        name
      }
    }
    stories: allMdx(
      sort: {frontmatter: {date: DESC}}
      filter: {
        frontmatter: {template: {eq: "travel-story"}, locale: {eq: $locale}}
      }
    ) {
      nodes {
        id
        ...PaperStoryFragment
      }
    }
  }
`
