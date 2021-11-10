import {faGithub} from "@fortawesome/free-brands-svg-icons"
import {faStar} from "@fortawesome/pro-light-svg-icons"
import {graphql} from "gatsby"
import React, {useMemo} from "react"

import {Grid} from "../components/grid"
import {PaperRepository} from "../components/paper-repository"
import {LayoutPage} from "../layouts/page"

const CodeOpenSource = ({
  data: {
    googleDocs: {
      name: title,
      childMdx: {body, excerpt},
    },
    githubData: {
      data: {viewer: githubViewer},
    },
  },
}) => {
  const starsCount = useMemo(() => {
    return githubViewer.repositories.nodes.reduce(
      (count, node) => count + node.stargazers.totalCount,
      0
    )
  }, [githubViewer])
  return (
    <LayoutPage
      title={title}
      description={excerpt}
      body={body}
      metadata={[
        {
          icon: faGithub,
          label: "cedricdelpoux",
          to: "https://github.com/cedricdelpoux",
        },
        {
          icon: faStar,
          label: starsCount,
          to: "https://github.com/cedricdelpoux",
        },
      ]}
    >
      <Grid>
        {githubViewer.repositories.nodes
          .filter((repository) => repository.stargazers.totalCount > 0)
          .map((repository) => (
            <PaperRepository key={repository.id} repository={repository} />
          ))}
      </Grid>
    </LayoutPage>
  )
}

export default CodeOpenSource

export const pageQuery = graphql`
  query CodeOpenSource($path: String!) {
    googleDocs(slug: {eq: $path}) {
      name
      childMdx {
        body
        excerpt
      }
    }
    githubData {
      data {
        viewer {
          repositories {
            nodes {
              id
              url
              name
              description
              stargazers {
                totalCount
              }
              forkCount
            }
          }
        }
      }
    }
  }
`
