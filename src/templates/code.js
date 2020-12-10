import {FormattedMessage} from "react-intl"
import {graphql} from "gatsby"
import React from "react"

import {LayoutPage} from "../layouts/page"
import {Masonry} from "../components/masonry"
import {PaperProject} from "../components/paper-project"
import {Title} from "../components/title"
import {View} from "../components/view"

const technologies = [
  {name: "Prettier", color: "56B3B4"},
  {name: "Netlify", color: "00AD9F"},
  {name: "React", color: "45b8d8"},
  {name: "CSS3", color: "264de4"},
  {name: "Gatsby", color: "663399"},
  {name: "GraphQL", color: "E10098"},
  {name: "Styled-components", color: "db7092"},
  {name: "Npm", color: "CB3837"},
  {name: "Git", color: "F1502F"},
  {name: "HTML5", color: "E34F26"},
  {name: "Babel", color: "f5da55", logoColor: "black"},
  {name: "Javascript", color: "F0DB4F", logoColor: "black"},
  {name: "Node.js", color: "43853d"},
]

export default ({
  data: {
    googleDocs: {
      name: title,
      childMarkdownRemark: {html, excerpt},
    },
    projects,
  },
}) => {
  return (
    <LayoutPage title={title} description={excerpt} html={html}>
      <Title as="h2">
        <FormattedMessage id="code.i-use-daily" />
      </Title>
      <View
        css={{
          flexDirection: "row",
          justifyContent: "center",
          alignSelf: "center",
          flexWrap: "wrap",
          maxWidth: 500,
          ml: -1,
          mb: -1,
        }}
      >
        {technologies.map((technology) => (
          <View
            key={technology.name}
            as="img"
            alt={technology.name}
            title={technology.name}
            src={`https://img.shields.io/badge/-${technology.name.replace(
              "-",
              "_"
            )}-${technology.color}?style=flat-square&logo=${
              technology.name
            }&logoColor=${technology.logoColor || "white"}`}
            css={{display: "inline-flex", ml: 1, mb: 1}}
          />
        ))}
      </View>
      {projects?.nodes.length > 0 && (
        <>
          <Title as="h2">
            <FormattedMessage id="code.projects" />
          </Title>
          <Masonry>
            {projects.nodes.map((project) => (
              <PaperProject key={project.slug} project={project} />
            ))}
          </Masonry>
        </>
      )}
    </LayoutPage>
  )
}

export const pageQuery = graphql`
  query Code($path: String!, $locale: String!) {
    googleDocs(slug: {eq: $path}) {
      name
      childMarkdownRemark {
        html
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
