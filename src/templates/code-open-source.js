import {faStar} from "@fortawesome/pro-light-svg-icons"
import {faGithub} from "@fortawesome/free-brands-svg-icons"
import {graphql} from "gatsby"
import React, {useMemo} from "react"

import {LayoutPage} from "../layouts/page"
import {Masonry} from "../components/masonry"
import {PaperRepository} from "../components/paper-repository"

export default ({
  data: {
    googleDocs: {
      name: title,
      childMarkdownRemark: {html, excerpt},
    },
    github,
  },
}) => {
  const starsCount = useMemo(() => {
    return github.viewer.repositories.nodes.reduce(
      (count, node) => count + node.stargazers.totalCount,
      0
    )
  }, [github])
  return (
    <LayoutPage
      title={title}
      description={excerpt}
      html={html}
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
      <Masonry>
        {github.viewer.repositories.nodes
          .filter((repository) => repository.stargazers.totalCount > 0)
          .map((repository) => (
            <PaperRepository key={repository.id} repository={repository} />
          ))}
      </Masonry>
    </LayoutPage>
  )
}

export const pageQuery = graphql`
  query CodeOpenSource($path: String!) {
    googleDocs(fields: {slug: {eq: $path}}) {
      name
      childMarkdownRemark {
        html
        excerpt
      }
    }
    github {
      viewer {
        repositories(
          first: 30
          privacy: PUBLIC
          ownerAffiliations: OWNER
          orderBy: {field: STARGAZERS, direction: DESC}
        ) {
          nodes {
            id
            ...PaperRepositoryFragment
          }
        }
      }
    }
  }
`
