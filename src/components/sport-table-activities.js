import {faStrava} from "@fortawesome/free-brands-svg-icons"
import {faBiking, faRunning} from "@fortawesome/pro-light-svg-icons"
import {graphql} from "gatsby"
import React from "react"

import {metersToKilometers} from "../utils/convertors"
import {getStravaActivityUrl} from "../utils/strava"
import {Icon} from "./icon"
import {Link} from "./link"
import {Table, TableButton, TableCell} from "./table"

export const SportTableActivities = ({activities}) => {
  return (
    <Table>
      <thead>
        <tr>
          <TableCell as="th" align="center">
            Type
          </TableCell>
          <TableCell as="th" align="center">
            Date
          </TableCell>
          <TableCell as="th" align="center">
            Distance
          </TableCell>
          <TableCell as="th" align="center">
            Elevation
          </TableCell>
          <TableCell as="th" align="center">
            Strava
          </TableCell>
        </tr>
      </thead>
      <tbody>
        {activities.map((activity) => (
          <tr key={activity.id}>
            <TableCell align="center">
              <Icon
                icon={activity.type === "Ride" ? faBiking : faRunning}
                css={{
                  fontSize: 4,
                }}
                gradient
              />
            </TableCell>
            <TableCell>{activity.start_date}</TableCell>
            <TableCell align="right">
              {metersToKilometers(activity.distance, 0) + " km"}
            </TableCell>
            <TableCell align="right">
              {activity.total_elevation_gain + " d+"}
            </TableCell>
            <TableCell>
              {activity.visibility === "everyone" && (
                <TableButton
                  as={Link}
                  to={getStravaActivityUrl(activity.id)}
                  noArrow
                >
                  <Icon icon={faStrava} css={{fontSize: 1}} />
                </TableButton>
              )}
            </TableCell>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export const query = graphql`
  fragment SportTableActivityFragment on StravaActivity {
    id
    type
    start_date(formatString: "DD MMM YY")
    distance
    total_elevation_gain
    visibility
  }
`
