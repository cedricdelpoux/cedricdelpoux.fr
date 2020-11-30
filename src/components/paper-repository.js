import {faCodeBranch, faStar} from "@fortawesome/pro-light-svg-icons"
import React from "react"
import {graphql} from "gatsby"

import {Paper, PaperMetadata} from "./paper"
import {Title} from "./title"
import {View} from "./view"

export const PaperRepository = ({
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
    <Paper to={url} css={{p: 3, gap: 2}} {...props}>
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

export const query = graphql`
  fragment PaperRepositoryFragment on GitHub_Repository {
    id
    url
    name
    description
    stargazers {
      totalCount
    }
    forkCount
  }
`
