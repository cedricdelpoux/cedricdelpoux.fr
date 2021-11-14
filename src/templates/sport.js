import {graphql} from "gatsby"
import React, {useMemo, useState} from "react"
import {FormattedMessage} from "react-intl"

import {Button} from "../components/button"
import {Grid} from "../components/grid"
import {Heatmap} from "../components/heatmap"
import {Link} from "../components/link"
import {PaperActivity} from "../components/paper-activity"
import {SwitcherSport} from "../components/switcher-sport"
import {Text} from "../components/text"
import {Title} from "../components/title"
import {View} from "../components/view"
import {useMenu} from "../hooks/use-menu"
import {LayoutPage} from "../layouts/page"

const Sport = ({
  data: {
    googleDocs: {
      name: title,
      childMdx: {body, excerpt},
    },
    fastestRuns,
    fastestRides,
    longestRuns,
    longestRides,
    latestRuns,
    latestRides,
  },
  pageContext: {locale},
}) => {
  const menu = useMenu(locale)
  const [sport, setSport] = useState("Run")
  const activities = useMemo(
    () => (sport === "Run" ? latestRuns.nodes : latestRides.nodes),
    [sport]
  )
  const fastestActivity = useMemo(
    () => (sport === "Run" ? fastestRuns.nodes[0] : fastestRides.nodes[0]),
    [sport]
  )
  const longestActivity = useMemo(
    () => (sport === "Run" ? longestRuns.nodes[0] : longestRides.nodes[0]),
    [sport]
  )
  const latestActivity = useMemo(
    () => (sport === "Run" ? latestRuns.nodes[0] : latestRides.nodes[0]),
    [sport]
  )
  return (
    <LayoutPage title={title} description={excerpt} body={body}>
      <SwitcherSport onChange={setSport} css={{alignSelf: "center"}} />
      <Title as="h2">
        <FormattedMessage id={`sport.types.${sport.toLowerCase()}`} />
      </Title>
      <Heatmap activities={activities} />
      <Grid>
        <View css={{gap: 2}}>
          <Title as="h3">
            <FormattedMessage id="sport.index.latest-activity" />
          </Title>
          <PaperActivity {...latestActivity} />
        </View>
        <View css={{gap: 2}}>
          <Title as="h3">
            <FormattedMessage id="sport.index.fastest-activity" />
          </Title>
          <PaperActivity {...fastestActivity} />
        </View>
        <View css={{gap: 2}}>
          <Title as="h3">
            <FormattedMessage id="sport.index.longest-activity" />
          </Title>
          <PaperActivity {...longestActivity} />
        </View>
      </Grid>
      <View css={{alignSelf: "center"}}>
        <Button as={Link} to={menu.categories.sport.items[0].path}>
          <Text>
            <FormattedMessage id="actions.see-more" />
          </Text>
        </Button>
      </View>
    </LayoutPage>
  )
}

export default Sport

export const pageQuery = graphql`
  query Sport($path: String!) {
    googleDocs(slug: {eq: $path}) {
      name
      childMdx {
        body
        excerpt
      }
    }
    latestRuns: allStravaActivity(
      filter: {
        type: {eq: "Run"}
        map: {summary_polyline: {ne: null}}
        visibility: {eq: "everyone"}
      }
      sort: {fields: [start_date], order: DESC}
      limit: 1000
    ) {
      nodes {
        ...PaperActivityFragment
      }
    }
    latestRides: allStravaActivity(
      filter: {
        type: {eq: "Ride"}
        map: {summary_polyline: {ne: null}}
        visibility: {eq: "everyone"}
      }
      sort: {fields: [start_date], order: DESC}
      limit: 1000
    ) {
      nodes {
        ...PaperActivityFragment
      }
    }
    fastestRuns: allStravaActivity(
      filter: {
        type: {eq: "Run"}
        map: {summary_polyline: {ne: null}}
        visibility: {eq: "everyone"}
      }
      sort: {fields: [average_speed], order: DESC}
      limit: 1
    ) {
      nodes {
        ...PaperActivityFragment
      }
    }

    fastestRides: allStravaActivity(
      filter: {
        type: {eq: "Ride"}
        map: {summary_polyline: {ne: null}}
        visibility: {eq: "everyone"}
      }
      sort: {fields: [average_speed], order: DESC}
      limit: 1
    ) {
      nodes {
        ...PaperActivityFragment
      }
    }
    longestRuns: allStravaActivity(
      filter: {
        type: {eq: "Run"}
        map: {summary_polyline: {ne: null}}
        visibility: {eq: "everyone"}
      }
      sort: {fields: [distance], order: DESC}
      limit: 1
    ) {
      nodes {
        ...PaperActivityFragment
      }
    }
    longestRides: allStravaActivity(
      filter: {
        type: {eq: "Ride"}
        map: {summary_polyline: {ne: null}}
        visibility: {eq: "everyone"}
      }
      sort: {fields: [distance], order: DESC}
      limit: 1
    ) {
      nodes {
        ...PaperActivityFragment
      }
    }
  }
`
