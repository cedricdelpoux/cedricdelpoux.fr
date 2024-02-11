import {faLink, faSchool} from "@fortawesome/pro-light-svg-icons"
import {graphql} from "gatsby"
import React, {useMemo} from "react"
import {FormattedDate, FormattedMessage} from "react-intl"

import {Button} from "../components/button"
import {Icon} from "../components/icon"
import {Link} from "../components/link"
import {Text} from "../components/text"
import {Timeline, TimelineItem} from "../components/timeline"
import {Title} from "../components/title"
import {View} from "../components/view"
import IconCed from "../icons/ced.svg"
import {LayoutPage} from "../layouts/page"
import {diffDates} from "../utils/date"
import {getWorkCompanyLogo} from "../utils/work"

const CodeCareer = ({
  data: {
    googleDocs: {
      name: title,
      childMdx: {body, excerpt},
    },
    githubData: {
      data: {
        viewer: {resumeGist},
      },
    },
  },
  pageContext: {locale},
}) => {
  const resume = useMemo(() => {
    const resumes = {
      fr: resumeGist.files[0],
      en: resumeGist.files[1],
    }
    return JSON.parse(resumes[locale].text)
  }, [locale, resumeGist])

  return (
    <LayoutPage title={title} description={excerpt} body={body}>
      <Timeline>
        {resume.work.map((work) => {
          const logo = getWorkCompanyLogo(work.company)
          console.log("logo", logo)
          return (
            <TimelineItem
              key={`${work.company}-${work.startDate}`}
              icon={
                logo ? (
                  <View as={logo} />
                ) : (
                  <View
                    as={IconCed}
                    css={{
                      "& path": {
                        stroke: "url(#svg-gradient)",
                      },
                    }}
                  />
                )
              }
              date={
                <View>
                  <Text>
                    <Text css={{textTransform: "capitalize"}}>
                      <FormattedDate
                        value={work.startDate}
                        year="numeric"
                        month="long"
                      />
                    </Text>
                    <Text>{" - "}</Text>
                    <Text css={{textTransform: "capitalize"}}>
                      {work.endDate ? (
                        <FormattedDate
                          value={work.endDate}
                          year="numeric"
                          month="long"
                        />
                      ) : (
                        "present"
                      )}
                    </Text>
                  </Text>
                  <Text>
                    (
                    {diffDates(
                      work.endDate ? new Date(work.endDate) : new Date(),
                      new Date(work.startDate),
                      {locale}
                    )}
                    )
                  </Text>
                </View>
              }
            >
              <Title as="h3" css={{mt: 0, mb: 2}}>
                {work.position} {work.company && `@ ${work.company}`}
              </Title>
              <View>{work.summary}</View>
              {work.highlights && (
                <ul>
                  {work.highlights.map((course, i) => (
                    <li key={i}>{course}</li>
                  ))}
                </ul>
              )}
              {work.website && (
                <Button
                  as={Link}
                  to={work.website}
                  icon={faLink}
                  text={<FormattedMessage id="actions.see-more" />}
                  css={{alignSelf: "center"}}
                />
              )}
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
              icon={<Icon icon={faSchool} gradient />}
              date={`${new Date(work.startDate).toLocaleDateString()} - ${
                work.endDate
                  ? new Date(work.endDate).toLocaleDateString()
                  : "present"
              }`}
            >
              <Title as="h3" css={{mt: 0, mb: 2}}>
                {work.studyType} @ {work.institution}
              </Title>
              {work.courses && (
                <ul>
                  {work.courses.map((course, i) => (
                    <li key={i}>{course}</li>
                  ))}
                </ul>
              )}
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
    githubData {
      data {
        viewer {
          resumeGist {
            files {
              name
              text
            }
          }
        }
      }
    }
  }
`
