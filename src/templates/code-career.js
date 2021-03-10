import {faBriefcase, faSchool} from "@fortawesome/pro-light-svg-icons"
import {graphql} from "gatsby"
import React, {useMemo} from "react"
import {FormattedMessage} from "react-intl"

import {Timeline, TimelineItem} from "../components/timeline"
import {Title} from "../components/title"
import {View} from "../components/view"
import {LayoutPage} from "../layouts/page"

const CodeCareer = ({
  data: {
    googleDocs: {
      name: title,
      childMdx: {body, excerpt},
    },
    github,
  },
  pageContext: {locale},
}) => {
  const resume = useMemo(() => {
    const resumes = {
      fr: github.viewer.gist.files[0],
      en: github.viewer.gist.files[1],
    }
    return JSON.parse(resumes[locale].text)
  }, [locale, github])

  return (
    <LayoutPage title={title} description={excerpt} body={body}>
      <Timeline>
        {resume.work.map((work) => {
          return (
            <TimelineItem
              key={`${work.compagny}-${work.startDate}`}
              icon={faBriefcase}
              date={`${new Date(work.startDate).toLocaleDateString()} - ${
                work.endDate
                  ? new Date(work.endDate).toLocaleDateString()
                  : "present"
              }`}
            >
              <Title as="h3" css={{mt: 0, mb: 2}}>
                {work.position}
              </Title>
              <View>{work.summary}</View>
            </TimelineItem>
          )
        })}
      </Timeline>
      <Title as="h2" css={{mt: 3, mb: 0}}>
        <FormattedMessage id="code.career.education" />
      </Title>
      <Timeline>
        {resume.education.map((work) => {
          return (
            <TimelineItem
              key={`${work.institution}-${work.startDate}`}
              icon={faSchool}
              date={`${new Date(work.startDate).toLocaleDateString()} - ${
                work.endDate
                  ? new Date(work.endDate).toLocaleDateString()
                  : "present"
              }`}
            >
              <Title as="h3" css={{mt: 0, mb: 2}}>
                {work.institution}
              </Title>
              <View>{work.studyType}</View>
            </TimelineItem>
          )
        })}
      </Timeline>
    </LayoutPage>
  )
}

export default CodeCareer

export const pageQuery = graphql`
  query CodeCareer($path: String!) {
    googleDocs(slug: {eq: $path}) {
      name
      childMdx {
        body
        excerpt
      }
    }
    github {
      viewer {
        gist(name: "fc7bdb427dd574dbebcac85ad5c94792") {
          files {
            name
            text
          }
        }
      }
    }
  }
`
