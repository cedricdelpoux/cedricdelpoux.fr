import {graphql} from "gatsby"
import React from "react"

import {Grid} from "../components/grid"
import {PaperProject} from "../components/paper-project"
import {LayoutPage} from "../layouts/page"

const Code = ({
  data: {
    mdx: {
      excerpt,
      frontmatter: {name: title},
    },
    projects,
  },
  children,
}) => {
  return (
    <LayoutPage title={title} description={excerpt} body={children}>
      {projects?.nodes.length > 0 && (
        <Grid>
          {projects.nodes.map((project) => (
            <PaperProject key={project.id} project={project} />
          ))}
        </Grid>
      )}
    </LayoutPage>
  )
}

export default Code

export const pageQuery = graphql`
  query Code($slug: String!, $locale: String!) {
    mdx(frontmatter: {slug: {eq: $slug}}) {
      excerpt
      frontmatter {
        name
      }
    }
    projects: allMdx(
      sort: {frontmatter: {date: DESC}}
      filter: {frontmatter: {type: {eq: "project"}, locale: {eq: $locale}}}
    ) {
      nodes {
        id
        ...PaperProjectFragment
      }
    }
  }
`
