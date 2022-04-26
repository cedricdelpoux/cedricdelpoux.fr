import {faStrava} from "@fortawesome/free-brands-svg-icons"
import {faRoute} from "@fortawesome/pro-light-svg-icons"
import {graphql} from "gatsby"
import React from "react"

import {Flag} from "../components/flag"
import {Icon} from "../components/icon"
import {Link} from "../components/link"
import {Table, TableButton} from "../components/table"
import {Text} from "../components/text"
import {View} from "../components/view"
import {LayoutPage} from "../layouts/page"
import {getClimbFinderUrl} from "../utils/climbfinder"
import {getStravaActivityUrl} from "../utils/strava"

const SportClimbs = ({
  data: {
    googleDocs: {
      name: title,
      childMdx: {body, excerpt},
    },
    climbs,
  },
  pageContext: {locale},
}) => {
  return (
    <LayoutPage title={title} description={excerpt} body={body}>
      <Table>
        <thead>
          <tr>
            <Text as="th" css={{display: "table-cell", textAlign: "center"}}>
              #
            </Text>
            <Text as="th" css={{display: "table-cell", textAlign: "center"}}>
              Nom
            </Text>
            <Text as="th" css={{display: "table-cell", textAlign: "center"}}>
              Category
            </Text>
            <Text as="th" css={{display: "table-cell", textAlign: "center"}}>
              Longueur
            </Text>
            <Text as="th" css={{display: "table-cell", textAlign: "center"}}>
              Pente moy
            </Text>
            <Text as="th" css={{display: "table-cell", textAlign: "center"}}>
              Pente max
            </Text>
            <Text as="th" css={{display: "table-cell", textAlign: "center"}}>
              Difficulté
            </Text>
            <Text as="th" css={{display: "table-cell", textAlign: "center"}}>
              Actions
            </Text>
          </tr>
        </thead>
        <tbody>
          {climbs.nodes.map((climb, i) => (
            <tr key={climb.name}>
              <Text as="td" css={{display: "table-cell", textAlign: "center"}}>
                {i + 1}
              </Text>
              <View as="td" css={{flexDirection: "row", gap: 1}}>
                <Flag country={climb.country} css={{width: "25px"}} />
                <Text>{climb.name}</Text>
              </View>
              <Text as="td" css={{display: "table-cell", textAlign: "center"}}>
                {climb.category === 0 ? "HC" : climb.category}
              </Text>
              <Text
                as="td"
                css={{display: "table-cell", textAlign: "right"}}
              >{`${climb.distance} km`}</Text>
              <Text
                as="td"
                css={{display: "table-cell", textAlign: "right"}}
              >{`${climb.avg_gradient} %`}</Text>
              <Text
                as="td"
                css={{display: "table-cell", textAlign: "right"}}
              >{`${climb.max_gradient} %`}</Text>
              <Text as="td" css={{display: "table-cell", textAlign: "right"}}>
                {climb.difficulty}
              </Text>
              <Text as="td" css={{display: "table-cell", textAlign: "center"}}>
                <TableButton
                  as={Link}
                  to={getStravaActivityUrl(climb.strava_id)}
                  noArrow
                >
                  <Icon icon={faStrava} css={{fontSize: 1}} />
                </TableButton>
                <TableButton
                  as={Link}
                  to={getClimbFinderUrl({id: climb.climbfinder_id, locale})}
                  inset="2px"
                  css={{ml: 1}}
                  noArrow
                >
                  <Icon icon={faRoute} css={{fontSize: 1}} />
                </TableButton>
              </Text>
            </tr>
          ))}
        </tbody>
      </Table>
    </LayoutPage>
  )
}

export default SportClimbs

export const pageQuery = graphql`
  query SportClimbs($path: String!) {
    googleDocs(slug: {eq: $path}) {
      name
      childMdx {
        body
        excerpt
      }
    }
    climbs: allClimbsJson(sort: {fields: difficulty, order: DESC}, limit: 10) {
      nodes {
        name
        category
        avg_gradient
        max_gradient
        country
        difficulty
        distance
        elevation_gain
        strava_id
        climbfinder_id
      }
    }
  }
`
