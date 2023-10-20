import {faStrava} from "@fortawesome/free-brands-svg-icons"
import {faRoute} from "@fortawesome/pro-light-svg-icons"
import {graphql} from "gatsby"
import React from "react"

import {Flag} from "../components/flag"
import {Icon} from "../components/icon"
import {Link} from "../components/link"
import {Table, TableButton, TableCell} from "../components/table"
import {Text} from "../components/text"
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
            <TableCell as="th" align="center">
              #
            </TableCell>
            <TableCell as="th" align="center">
              Nom
            </TableCell>
            <TableCell as="th" align="center">
              Category
            </TableCell>
            <TableCell as="th" align="center">
              Longueur
            </TableCell>
            <TableCell as="th" align="center">
              Pente moy
            </TableCell>
            <TableCell as="th" align="center">
              Pente max
            </TableCell>
            <TableCell as="th" align="center">
              Difficulté
            </TableCell>
            <TableCell as="th" align="center">
              Actions
            </TableCell>
          </tr>
        </thead>
        <tbody>
          {climbs.nodes.map((climb, i) => (
            <tr key={climb.name}>
              <TableCell>{i + 1}</TableCell>
              <TableCell css={{display: "flex", flexDirection: "row", gap: 1}}>
                <Flag country={climb.country} css={{width: "25px"}} />
                <Text>{climb.name}</Text>
              </TableCell>
              <TableCell align="center">
                {climb.category === 0 ? "HC" : climb.category}
              </TableCell>
              <TableCell align="right">{`${climb.distance} km`}</TableCell>
              <TableCell align="right">{`${climb.avg_gradient} %`}</TableCell>
              <TableCell align="right">{`${climb.max_gradient} %`}</TableCell>
              <TableCell align="right">{climb.difficulty}</TableCell>
              <TableCell>
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
              </TableCell>
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
