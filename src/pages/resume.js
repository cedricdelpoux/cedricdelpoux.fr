import React, {useContext, useMemo} from "react"
import {faAt, faBrowser, faPhone} from "@fortawesome/pro-light-svg-icons"

import {Icon} from "../components/icon"
import {Link} from "../components/link"
import {StaticImage} from "gatsby-plugin-image"
import {Text} from "../components/text"
import {Title} from "../components/title"
import {View} from "../components/view"
import {graphql} from "gatsby"

var {ThemeContext, useGlobalCss} = require("css-system")

const PageResume = ({
  data: {
    githubData: {
      data: {
        viewer: {resumeGist},
      },
    },
  },
}) => {
  const theme = useContext(ThemeContext)

  useGlobalCss({
    html: {
      background: "white",
    },
    body: {
      m: 0,
      p: 0,
      fontFamily: "Quicksand",
    },

    "*, *:before, *:after": {
      boxSizing: "border-box",
    },

    ul: {
      listStyle: "square",
    },

    "a:-webkit-any-link": {
      color: "inherit",
      cursor: "pointer",
      textDecoration: "none",
    },
    "@media print": {
      "@page": {
        size: "A4",
        // margin: 0,
        // padding: 0,
      },
      // body: {
      //   "-webkit-print-color-adjust": "exact !important",
      //   margin: "0",
      //   p: 0,
      //   border: "initial",
      //   borderRadius: "initial",
      //   width: "initial",
      //   minHeight: "initial",
      //   boxShadow: "initial",
      //   background: "initial",
      //   pageBreakAfter: "always",
      // },

      // "html, body": {
      //   width: "210mm",
      //   height: "297mm",
      //   padding: 0,
      // },
    },
  })
  const jsonResume = useMemo(
    () => JSON.parse(resumeGist.files[0].text),
    [resumeGist]
  )
  return (
    <>
      <View as="svg" xmlns="http://www.w3.org/2000/svg" css={{height: 0}}>
        <defs>
          <linearGradient id="svg-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={theme.colors.secondary} />
            <stop offset="100%" stopColor={theme.colors.primary} />
          </linearGradient>
        </defs>
      </View>
      <View
        css={{
          width: "210mm",
          height: "297mm",
          margin: "20px auto",
          border: "1px #d3d3d3 solid",
          borderRadius: 1,
          background: `linear-gradient(110deg, ${theme.colors.secondary} 0%, ${theme.colors.secondary} 30%, ${theme.colors.primary} 100%)`,
          boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          p: 3,
          position: "relative",
        }}
      >
        <View
          css={{
            flexDirection: "row",
            px: 3,
            gap: 3,
            background: "#fff",
            borderRadius: 0,
          }}
        >
          <View
            css={{
              alignSelf: "flex-end",
              width: "160px",
              mx: "24px",
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                background: `linear-gradient(to right, ${theme.colors.secondary} 0%, ${theme.colors.secondary} 15%, ${theme.colors.primary} 100%)`,
                borderRadius: "50%",
                width: "130%",
                paddingBottom: "130%",
                bottom: "-12%",
                left: "50%",
                transform: "translateX(-50%)",
                clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 85%)",
              },
              "&::after": {
                content: '""',
                position: "absolute",
                background: "#fff",
                width: "130%",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                height: "3px",
              },
            }}
          >
            <StaticImage
              src={"../assets/cedric-delpoux.png"}
              alt="Cédric Delpoux"
              placeholder="blurred"
            />
          </View>
          <Personal jsonResume={jsonResume} />
        </View>
        <View
          as="h1"
          css={{
            justifyContent: "center",
            alignItems: "center",
            p: 0,
            my: 2,
            color: "#fff",
          }}
        >
          {jsonResume.basics.label}
        </View>
        <View css={{flexDirection: "row", flex: 1}}>
          <View
            css={{
              flex: 1,
              gap: 2,
            }}
          >
            <View
              css={{gap: 2, background: "#fff", py: 2, px: 3, borderRadius: 0}}
            >
              <Text
                as="h2"
                css={{
                  mt: 0,
                  mb: 0,
                  alignSelf: "flex-start",
                  gradient: true,
                }}
              >
                Experience
              </Text>
              {jsonResume.work.map((work) => {
                return (
                  <View
                    key={`${work.compagny}-${work.startDate}`}
                    css={{
                      position: "relative",
                      "&::after": {
                        content: `"${new Date(work.startDate).getFullYear()}"`,
                        position: "absolute",
                        top: "0",
                        left: 0,
                        transform: "translate(-100%)",
                        background: "#fff",
                        width: theme.space[4],
                        textAlign: "center",
                        px: 1,
                        borderRadius: "999",
                      },
                    }}
                  >
                    <View as="h3" css={{m: 0}}>
                      {work.position}
                    </View>
                    <View>{work.summary}</View>
                  </View>
                )
              })}
            </View>
            <View
              css={{
                gap: 2,
                background: "#fff",
                py: 2,
                px: 3,
                flex: 1,
                borderRadius: 0,
              }}
            >
              <Text
                as="h2"
                css={{alignSelf: "flex-start", gradient: true, mt: 0, mb: 0}}
              >
                Education
              </Text>
              {jsonResume.education.map(
                ({studyType, institution, startDate}) => (
                  <View
                    key={`${institution}-${startDate}`}
                    css={{
                      position: "relative",
                      "&::after": {
                        content: `"${new Date(startDate).getFullYear()}"`,
                        position: "absolute",
                        top: "0",
                        left: 0,
                        transform: "translate(-100%)",
                        background: "#fff",
                        width: theme.space[4],
                        textAlign: "center",
                        px: 1,
                        borderRadius: "999",
                      },
                    }}
                  >
                    <View as="h3" css={{m: 0}}>
                      {studyType}
                    </View>
                  </View>
                )
              )}
            </View>
          </View>
          <View
            css={{
              ml: 2,
              gap: 2,
              flexBasis: "40%",
            }}
          >
            <View css={{background: "#fff", p: 2, borderRadius: 0}}>
              <Text
                as="h2"
                css={{
                  mt: 0,
                  mb: 0,
                  gradient: true,
                  alignSelf: "flex-start",
                }}
              >
                Skills
              </Text>
              {jsonResume.skills.map((skill) => (
                <View key={skill.name} flexDirection="column">
                  <View as="h3" css={{fontSize: 1, m: 0}}>
                    {skill.name}
                  </View>
                  <View
                    css={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                    }}
                  >
                    {skill.keywords.map((keyword) => (
                      <Tag key={keyword}>{keyword}</Tag>
                    ))}
                  </View>
                </View>
              ))}
            </View>
            <View css={{background: "#fff", p: 2, borderRadius: 0}}>
              <Text
                as="h2"
                css={{
                  m: 0,
                  gradient: true,
                  alignSelf: "flex-start",
                }}
              >
                Interest
              </Text>
              {jsonResume.interests.map((interest) => (
                <View key={interest.name} flexDirection="column">
                  <View as="h3" css={{fontSize: 1, m: 0}}>
                    {interest.name}
                  </View>
                  <View css={{flexDirection: "row", flexWrap: "wrap"}}>
                    {interest.keywords.map((keyword) => (
                      <Tag key={keyword}>{keyword}</Tag>
                    ))}
                  </View>
                </View>
              ))}
            </View>
            <View css={{background: "#fff", p: 2, gap: 2, borderRadius: 0}}>
              <Text
                as="h2"
                css={{
                  m: 0,
                  gradient: true,
                  alignSelf: "flex-start",
                }}
              >
                Languages
              </Text>
              <View css={{flexDirection: "row", flexWrap: "wrap"}}>
                {jsonResume.languages.map(({language, fluency}) => (
                  <Tag key={language}>
                    {language} ({fluency})
                  </Tag>
                ))}
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  )
}

const Tag = (props) => {
  return (
    <View
      css={{
        border: "2px solid",
        borderImage: "gradient",
        borderImageSlice: 2,
        fontSize: 0,
        px: "4px",
        py: "2px",
        lineHeight: "1em",
        mr: "4px",
        mb: "4px",
      }}
      {...props}
    />
  )
}

const Personal = ({
  jsonResume: {
    basics: {name, email, phone, summary},
  },
}) => (
  <View css={{gap: 2, flex: 1, my: 2}}>
    <View css={{flexDirection: "row", alignItems: "center", gap: 1}}>
      <View css={{flex: 1, alignItems: "flex-start"}}>
        <Title
          as="h1"
          css={{
            mt: 0,
            center: false,
            lineHeight: "1.2em",
          }}
        >
          {name}
        </Title>
      </View>
      <View>
        <View css={{flexDirection: "row", alignItems: "center", gap: 1}}>
          <Icon icon={faAt} gradient />
          <Link to="/contact">{email}</Link>
        </View>
        <View css={{flexDirection: "row", alignItems: "center", gap: 1}}>
          <Icon icon={faPhone} gradient />
          <Text>{phone}</Text>
        </View>
        <View css={{flexDirection: "row", alignItems: "center", gap: 1}}>
          <Icon icon={faBrowser} gradient />
          <Text>cedricdelpoux.fr</Text>
        </View>
      </View>
    </View>
    <View>{summary}</View>
  </View>
)

export default PageResume

export const pageQuery = graphql`
  query ResumeQuery {
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
