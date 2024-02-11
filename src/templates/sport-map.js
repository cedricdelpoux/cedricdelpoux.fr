import {graphql} from "gatsby"
import React, {useState} from "react"
import {useIntl} from "react-intl"

import {Checkbox} from "../components/checkbox"
import {Select} from "../components/select"
import {SportTilesMap} from "../components/sport-tiles-map"
import {View} from "../components/view"
import {LayoutPage} from "../layouts/page"

const SportMap = ({
  data: {
    googleDocs: {
      name: title,
      childMdx: {body, excerpt},
    },
    activities,
    statsHunters,
  },
}) => {
  const intl = useIntl()
  const [type, setType] = useState("all")

  const [showTiles, setShowTiles] = useState(true)
  const [showActivities, setShowActivities] = useState(false)

  return (
    <LayoutPage
      title={title}
      body={body}
      description={excerpt}
      css={{
        maxWidth: "100%",
        mb: 2,
      }}
    >
      <View
        css={{
          flexDirection: {_: "column", s: "row"},
          gap: 2,
          alignSelf: "center",
          alignItems: "center",
        }}
      >
        <Checkbox
          label={intl.formatMessage({
            id: "sport.map.tiles",
          })}
          checked={showTiles}
          onChange={setShowTiles}
        />
        <Checkbox
          label={intl.formatMessage({
            id: "sport.map.activities",
          })}
          checked={showActivities}
          onChange={setShowActivities}
        />
        <Select
          onChange={(e) => setType(e.target.value)}
          value={type}
          css={{ml: 0}}
        >
          <option value="all">
            {intl.formatMessage({
              id: "sport.types.all",
            })}
          </option>
          <option value="run">
            {intl.formatMessage({
              id: "sport.types.run",
            })}
          </option>
          <option value="ride">
            {intl.formatMessage({
              id: "sport.types.ride",
            })}
          </option>
        </Select>
      </View>
      <View>
        <SportTilesMap
          activities={activities}
          statsHunters={statsHunters}
          showActivities={showActivities}
          showTiles={showTiles}
          type={type}
          withControls={true}
          css={{height: "80vh"}}
        />
      </View>
    </LayoutPage>
  )
}

export default SportMap

export const pageQuery = graphql`
  query SportMap($path: String!) {
    googleDocs(slug: {eq: $path}) {
      name
      childMdx {
        excerpt
      }
    }
    activities: allStravaActivity(
      filter: {
        type: {in: ["Run", "Ride", "Hike"]}
        map: {summary_polyline: {ne: null}}
        visibility: {eq: "everyone"}
      }
      sort: {fields: [start_date], order: DESC}
    ) {
      nodes {
        type
        map {
          geoJSON {
            type
            coordinates
          }
        }
        start_latlng
        ...SportTableActivityFragment
      }
    }
    statsHunters {
      square
      tiles
      cluster
    }
  }
`
