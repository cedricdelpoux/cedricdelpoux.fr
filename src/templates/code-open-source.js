import {FormattedMessage} from "react-intl"
import {faCodeBranch, faStar} from "@fortawesome/pro-light-svg-icons"
import {faGithub} from "@fortawesome/free-brands-svg-icons"
import {graphql} from "gatsby"
import React, {useMemo} from "react"

import {LayoutPage} from "../layouts/page"
import {Masonry} from "../components/masonry"
import {Paper, PaperMetadata} from "../components/paper"
import {Title} from "../components/title"
import {View} from "../components/view"

const PaperRepository = ({
  repository: {
    url,
    name,
    description,
    stargazers: {totalCount: starCount},
    forkCount,
  },
  ...props
}) => {
  return (
    <Paper href={url} css={{p: 3, gap: 2}} {...props}>
      <Title as="h2" css={{m: 0}}>
        {name}
      </Title>
      <PaperMetadata
        items={[
          {
            icon: faStar,
            label: starCount,
          },
          {icon: faCodeBranch, label: forkCount},
        ]}
      />
      <View>{description}</View>
    </Paper>
  )
}

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
          url: "https://github.com/cedricdelpoux",
        },
        {icon: faStar, label: starsCount},
      ]}
    >
      {github && github.viewer.repositories.nodes && (
        <>
          <Title as="h2">
            <FormattedMessage id="pages.code.open-source.projects" />
          </Title>
          <Masonry>
            {github.viewer.repositories.nodes
              .filter((repository) => repository.stargazers.totalCount > 0)
              .map((repository) => (
                <PaperRepository key={repository.id} repository={repository} />
              ))}
          </Masonry>
        </>
      )}
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
`
