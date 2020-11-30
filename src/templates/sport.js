import {FormattedMessage} from "react-intl"
import {graphql} from "gatsby"
import React, {useMemo, useState} from "react"
import ReactTooltip from "react-tooltip"

import {Button} from "../components/button"
import {Heatmap} from "../components/heatmap"
import {LayoutPage} from "../layouts/page"
import {Link} from "../components/link"
import {Masonry} from "../components/masonry"
import {PaperActivity} from "../components/paper-activity"
import {SwitcherSport} from "../components/switcher-sport"
import {Text} from "../components/text"
import {Title} from "../components/title"
import {View} from "../components/view"

export default ({
  data: {
    googleDocs: {
      name: title,
      childMarkdownRemark: {html, excerpt},
    },
    fastestRuns,
    fastestRides,
    longestRuns,
    longestRides,
    latestRuns,
    latestRides,
  },
}) => {
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
    <LayoutPage title={title} description={excerpt} html={html}>
      <SwitcherSport
        value={sport}
        onChange={() =>
          setSport((oldSport) => (oldSport === "Run" ? "Ride" : "Run"))
        }
        css={{alignSelf: "center"}}
      />
      <Title as="h2">
        <FormattedMessage id={`sport.types.${sport.toLowerCase()}`} />
      </Title>
      <Heatmap activities={activities} />
      <Masonry>
        <View css={{gap: 2}}>
          <Title as="h3">
            <FormattedMessage id="sport.index.latest-activity" />
          </Title>
          <PaperActivity activity={latestActivity.activity} />
        </View>
        <View css={{gap: 2}}>
          <Title as="h3">
            <FormattedMessage id="sport.index.fastest-activity" />
          </Title>
          <PaperActivity activity={fastestActivity.activity} />
        </View>
        <View css={{gap: 2}}>
          <Title as="h3">
            <FormattedMessage id="sport.index.longest-activity" />
          </Title>
          <PaperActivity activity={longestActivity.activity} />
        </View>
      </Masonry>
      <View css={{alignSelf: "center"}}>
        <Button as={Link} to="/sport/activities">
          <Text>
            <FormattedMessage id="actions.see-more" />
          </Text>
        </Button>
      </View>
      <ReactTooltip />
    </LayoutPage>
  )
}

export const pageQuery = graphql`
  query Sport($path: String!) {
    googleDocs(fields: {slug: {eq: $path}}) {
      name
      childMarkdownRemark {
        html
        excerpt
      }
    }
    latestRuns: allStravaActivity(
      filter: {
        activity: {type: {eq: "Run"}, map: {summary_polyline: {ne: null}}}
      }
      sort: {fields: [activity___start_date], order: DESC}
      limit: 1000
    ) {
      nodes {
        ...PaperActivityFragment
      }
    }

    latestRides: allStravaActivity(
      filter: {
        activity: {type: {eq: "Ride"}, map: {summary_polyline: {ne: null}}}
      }
      sort: {fields: [activity___start_date], order: DESC}
      limit: 1000
    ) {
      nodes {
        ...PaperActivityFragment
      }
    }

    fastestRuns: allStravaActivity(
      filter: {
        activity: {type: {eq: "Run"}, map: {summary_polyline: {ne: null}}}
      }
      sort: {fields: [activity___average_speed], order: DESC}
      limit: 1
    ) {
      nodes {
        ...PaperActivityFragment
      }
    }

    fastestRides: allStravaActivity(
      filter: {
        activity: {type: {eq: "Ride"}, map: {summary_polyline: {ne: null}}}
      }
      sort: {fields: [activity___average_speed], order: DESC}
      limit: 1
    ) {
      nodes {
        ...PaperActivityFragment
      }
    }
    longestRuns: allStravaActivity(
      filter: {
        activity: {type: {eq: "Run"}, map: {summary_polyline: {ne: null}}}
      }
      sort: {fields: [activity___distance], order: DESC}
      limit: 1
    ) {
      nodes {
        ...PaperActivityFragment
      }
    }

    longestRides: allStravaActivity(
      filter: {
        activity: {type: {eq: "Ride"}, map: {summary_polyline: {ne: null}}}
      }
      sort: {fields: [activity___distance], order: DESC}
      limit: 1
    ) {
      nodes {
        ...PaperActivityFragment
      }
    }
  }
`
