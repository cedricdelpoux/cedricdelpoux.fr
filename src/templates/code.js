import {graphql} from "gatsby"
import React from "react"

import {Grid} from "../components/grid"
import {PaperProject} from "../components/paper-project"
import {LayoutPage} from "../layouts/page"

export default ({
  data: {
    googleDocs: {
      name: title,
      childMdx: {body, excerpt},
    },
    projects,
  },
}) => {
  return (
    <LayoutPage title={title} description={excerpt} body={body}>
      {projects?.nodes.length > 0 && (
        <Grid>
          {projects.nodes.map((project) => (
            <PaperProject key={project.slug} project={project} />
          ))}
        </Grid>
      )}
    </LayoutPage>
  )
}

export const pageQuery = graphql`
  query Code($path: String!, $locale: String!) {
    googleDocs(slug: {eq: $path}) {
      name
      childMdx {
        body
        excerpt
      }
    }
    projects: allGoogleDocs(
      sort: {fields: date, order: DESC}
      filter: {type: {eq: "project"}, locale: {eq: $locale}}
    ) {
      nodes {
        slug
        ...PaperProjectFragment
      }
    }
  }
`
