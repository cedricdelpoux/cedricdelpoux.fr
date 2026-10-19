import React, {useContext, useEffect, useMemo, useState} from "react"
import {
  faAddressCard,
  faBriefcase,
  faCode,
  faEarthEurope,
  faFilm,
  faMapLocationDot,
  faMountains,
  faNewspaper,
  faPersonRunning,
  faPhotoFilm,
  faRoute,
} from "@fortawesome/pro-light-svg-icons"

import {AnimationCode} from "../components/animation-code"
import {AnimationSport} from "../components/animation-sport"
import {AnimationTravel} from "../components/animation-travel"
import {Avatar} from "../components/avatar"
import {Button} from "../components/button"
import {FormattedMessage} from "react-intl"
import {Html} from "../components/html"
import {LayoutPage} from "../layouts/page"
import {Link} from "../components/link"
import {MapTimeline} from "../components/map-timeline"
import {ListNumber} from "../components/list-number"
import {Paper} from "../components/paper"
import {PaperActivityCompact} from "../components/paper-activity"
import {PaperCountryCompact} from "../components/paper-country"
import {PaperPhoto} from "../components/paper-photo"
import {PaperStoryCompact} from "../components/paper-story"
import {PaperVideoCompact} from "../components/paper-video"
import {Slideshow} from "../components/slideshow"
import {SportTilesMap} from "../components/sport-tiles-map"
import {Text} from "../components/text"
import {ThemeContext} from "css-system"
import {Title} from "../components/title"
import {View} from "../components/view"
import {getMonthlyTiles} from "../utils/tiles-timeline"
import {getStravaActivityUrl} from "../utils/strava"
import {graphql} from "gatsby"
import {useMenu} from "../hooks/use-menu"

const toKm = (x) => Math.ceil(x * 1.609344)
// Sparse early years make the loop mostly empty tiles for a long stretch --
// starting the animated history here keeps it visually interesting
const TILES_START_MONTH = "2019-01"

// A swatch drawn like the matching map layer: a filled and outlined square,
// or just its border
const TilesLegend = ({color, bordered = false, children}) => (
  <View css={{flexDirection: "row", alignItems: "center", gap: 1}}>
    <View
      css={{
        flexShrink: 0,
        width: 14,
        height: 14,
        borderRadius: "2px",
      }}
      style={{
        border: `${bordered ? 2 : 1}px solid ${color}`,
        background: bordered ? "transparent" : `${color}80`,
      }}
    />
    <Text css={{fontSize: 1}}>{children}</Text>
  </View>
)

const HomeTitle = ({css, children, ...props}) => (
  <Title
    css={{
      mt: 4,
      fontSize: {
        _: 4,
        s: 6,
        m: 7,
      },
      ...css,
    }}
    {...props}
  >
    {children}
  </Title>
)

const Home = ({
  data: {
    mdx: {
      excerpt,
      frontmatter: {text1, text2, text3},
    },
    activities,
    stravaAthlete: {tilesTimeline},
    climbs,
    stories,
    countries,
    sportYoutube,
    travelYoutube,
    sportPhotos,
  },
  pageContext: {locale},
  children,
}) => {
  const theme = useContext(ThemeContext)
  const menu = useMenu(locale)

  // Every month since TILES_START_MONTH, the empty ones included, so that
  // the timeline's scale is regular. The map gets the earlier ones too.
  const allMonthly = useMemo(
    () => getMonthlyTiles(tilesTimeline),
    [tilesTimeline]
  )
  const startIndex = useMemo(() => {
    const index = allMonthly.findIndex(
      (month) => month.yearMonth >= TILES_START_MONTH
    )

    return index === -1 ? allMonthly.length : index
  }, [allMonthly])
  const monthly = useMemo(
    () => allMonthly.slice(startIndex),
    [allMonthly, startIndex]
  )
  const yearMonths = useMemo(
    () => monthly.map((month) => month.yearMonth),
    [monthly]
  )
  // Always playing, looping: a decorative "progress since day one" strip,
  // not a player -- so the timeline can't be dragged, it advances on a timer
  const STEP_DURATION_MS = 500
  const [monthIndex, setMonthIndex] = useState(0)
  useEffect(() => {
    if (yearMonths.length === 0) return

    const interval = setInterval(() => {
      setMonthIndex((index) => (index < yearMonths.length - 1 ? index + 1 : 0))
    }, STEP_DURATION_MS)
    return () => clearInterval(interval)
  }, [yearMonths])

  const month = monthly[monthIndex]
  return (
    <LayoutPage
      title="Cédric Delpoux"
      description={excerpt}
      css={{alignItems: "center"}}
    >
      <View
        css={{
          flexDirection: {_: "column", m: "row"},
          alignItems: "center",
          gap: 3,
        }}
      >
        {locale === "fr" ? (
          <Button as={Link} to="/en" flag="united-kingdom" text="English" />
        ) : (
          <Button as={Link} to="/" flag="france" text="Français" />
        )}
        <Avatar />
        <Button
          as={Link}
          to={menu.items.about.path}
          icon={faAddressCard}
          text={menu.items.about.name}
        />
      </View>
      <Html body={children} css={{textAlign: "center"}} />

      <HomeTitle as="h2">
        <FormattedMessage id="home.developer" />
      </HomeTitle>
      <View
        css={{
          flexDirection: {_: "column", m: "row"},
          alignItems: "center",
          gap: 3,
        }}
      >
        <View
          css={{
            flex: 1,
            alignItems: "center",
            gap: 3,
          }}
        >
          <Text css={{textAlign: "justify"}}>{text1}</Text>
          <View
            css={{
              flexDirection: "row",
              justifyContent: "center",
              flexWrap: "wrap",
              mt: {_: 0, s: 2},
            }}
          >
            <Button
              as={Link}
              to={menu.categories.code.items[0].path}
              icon={faCode}
              text={menu.categories.code.items[0].name}
              css={{mt: {_: 2, s: 0}, mr: 2}}
            />
            <Button
              as={Link}
              to={menu.categories.code.items[1].path}
              icon={faBriefcase}
              text={menu.categories.code.items[1].name}
              css={{mt: {_: 2, s: 0}}}
            />
          </View>
        </View>
        <View css={{height: 300}}>
          <AnimationCode />
        </View>
      </View>

      <HomeTitle as="h2">
        <FormattedMessage id="home.sporty" />
      </HomeTitle>
      <View
        css={{
          flexDirection: {_: "column", m: "row"},
          alignItems: "center",
        }}
      >
        <View
          css={{
            order: {_: 2, m: 1},
            height: 330,
            width: 200,
            mt: {_: 3, m: 0},
          }}
        >
          <AnimationSport />
        </View>
        <View
          css={{
            order: {_: 1, m: 2},
            flex: 1,
            alignItems: "center",
          }}
        >
          <Text css={{textAlign: "justify"}}>{text2}</Text>
          <View
            css={{
              flexDirection: {_: "column", m: "row"},
              gap: 2,
              maxWidth: {_: 335, s: 975, m: 780},
              overflow: "hidden",
              mt: 3,
            }}
          >
            <PaperVideoCompact
              {...sportYoutube}
              css={{
                height: {_: "auto", m: 140},
                width: {_: 335, s: 350, m: "auto"},
                aspectRatio: "16 / 9",
              }}
            />
            {sportPhotos?.nodes?.length > 0 && (
              <Slideshow
                spaceBetween={theme.space[2]}
                breakpoints={{
                  [theme.breakpointsInt.s]: {
                    slidesPerView: 1,
                  },
                  [theme.breakpointsInt.m]: {
                    slidesPerView: 2,
                  },
                }}
                css={{
                  flex: 1,
                  width: {_: 335, s: 350, m: "auto"},
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                {sportPhotos?.nodes.map((node) => (
                  <PaperPhoto
                    key={node.id}
                    photo={node}
                    alt={`Sport photo ${node.id}`}
                    css={{
                      width: {_: 335, s: 350, m: "auto"},
                      height: {_: "auto", m: 140},
                      aspectRatio: "16 / 9",
                      objectFit: "cover",
                    }}
                  />
                ))}
              </Slideshow>
            )}
          </View>
          <View
            css={{
              flexDirection: "row",
              justifyContent: "center",
              flexWrap: "wrap",
              mt: {_: 2, s: 3},
            }}
          >
            <Button
              as={Link}
              to={menu.categories.sport.items[0].path}
              icon={faNewspaper}
              text={menu.categories.sport.items[0].name}
              css={{mt: {_: 2, s: 0}, mr: 2}}
            />
            <Button
              as={Link}
              to={menu.categories.sport.items[3].path}
              icon={faPhotoFilm}
              text={menu.categories.sport.items[3].name}
              css={{mt: {_: 2, s: 0}, mr: 2}}
            />
            <Button
              as={Link}
              to={menu.categories.sport.items[4].path}
              icon={faRoute}
              text={menu.categories.sport.items[4].name}
              css={{mt: {_: 2, s: 0}}}
            />
          </View>
        </View>
      </View>

      <MapTimeline yearMonths={yearMonths} index={monthIndex}>
        <View
          css={{
            position: "relative",
            width: "100%",
            aspectRatio: {_: "10 / 16", s: "16 / 10"},
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <SportTilesMap
            monthly={allMonthly}
            monthIndex={startIndex + monthIndex}
            showTiles={true}
            initialZoom={6.5}
            initialZoomWidth={900}
          />
          {month && (
            <Paper
              css={{
                // The map is too small on a phone to spare it the room
                display: {_: "none", s: "flex"},
                position: "absolute",
                // Below, out of the way of the timeline's month at the top
                bottom: {_: 1, s: 2},
                left: {_: 1, s: 2},
                whiteSpace: "nowrap",
                gap: 1,
                p: 2,
              }}
            >
              <TilesLegend color={theme.colors.secondary}>
                <FormattedMessage
                  id="home.tiles.count"
                  values={{
                    count: month.count,
                  }}
                />
              </TilesLegend>
              <TilesLegend color={theme.colors.primary}>
                <FormattedMessage
                  id="home.tiles.new"
                  values={{count: month.new.length}}
                />
              </TilesLegend>
              <TilesLegend color={theme.colors.primary} bordered>
                <FormattedMessage
                  id="home.tiles.square"
                  values={{
                    size: month.square?.size || 0,
                    km: toKm(month.square?.size || 0),
                  }}
                />
              </TilesLegend>
            </Paper>
          )}
          <Button
            as={Link}
            to={menu.categories.sport.items[4].path}
            icon={faMapLocationDot}
            text={<FormattedMessage id="actions.see-more" />}
            css={{
              position: "absolute",
              bottom: {_: 1, s: 2},
              right: {_: 1, s: 2},
            }}
          />
        </View>
      </MapTimeline>

      <View
        css={{
          flexDirection: {_: "column", m: "row"},
          alignSelf: "stretch",
          gap: 3,
        }}
      >
        <View css={{flex: 1, gap: 2}}>
          <Title as="h3">
            <FormattedMessage id="home.last-adventures" />
          </Title>
          {activities.nodes.map((node) => (
            <PaperActivityCompact key={node.id} {...node} />
          ))}
        </View>
        <View css={{flex: 1, gap: 2}}>
          <Title as="h3">
            <FormattedMessage id="home.best-climbs" />
          </Title>
          <View css={{alignItems: "center", gap: 2}}>
            <ListNumber css={{columnCount: {_: 1, s: 2}}}>
              {climbs.nodes.map((node) => (
                <li key={node.id}>
                  <Link to={getStravaActivityUrl(node.strava_id)}>
                    {node.name}
                  </Link>
                </li>
              ))}
            </ListNumber>
            <View css={{flexDirection: "row", gap: 2}}>
              <Button
                as={Link}
                to={menu.categories.sport.items[1].path}
                icon={faPersonRunning}
                text={menu.categories.sport.items[1].name}
              />
              <Button
                as={Link}
                to={menu.categories.sport.items[2].path}
                icon={faMountains}
                text={menu.categories.sport.items[2].name}
              />
            </View>
          </View>
        </View>
      </View>

      <HomeTitle as="h2">
        <FormattedMessage id="home.traveler" />
      </HomeTitle>
      <View
        css={{
          flexDirection: {_: "column", m: "row"},
          alignItems: "center",
          gap: 3,
        }}
      >
        <View
          css={{
            flex: 2,
            alignItems: "center",
            gap: 3,
          }}
        >
          <Text css={{textAlign: "justify"}}>{text3}</Text>
          <PaperVideoCompact {...travelYoutube} />
          <View css={{flexDirection: "row", justifyContent: "center", gap: 2}}>
            <Button
              as={Link}
              to={menu.categories.travel.items[0].path}
              icon={faEarthEurope}
              text={menu.categories.travel.items[0].name}
            />
            <Button
              as={Link}
              to={menu.categories.travel.items[2].path}
              icon={faFilm}
              text={menu.categories.travel.items[2].name}
            />
          </View>
        </View>
        <View css={{flex: 3, width: "100%"}}>
          <AnimationTravel />
        </View>
      </View>
      <View
        css={{
          flexDirection: {_: "column", m: "row"},
          alignSelf: "stretch",
          gap: 3,
        }}
      >
        <View css={{flex: 1, gap: 2}}>
          <Title as="h3">
            <FormattedMessage id="home.last-travel-stories" />
          </Title>
          {stories.nodes.map((node) => (
            <PaperStoryCompact key={node.id} {...node} />
          ))}
        </View>
        <View css={{flex: 1, gap: 2}}>
          <Title as="h3">
            <FormattedMessage id="home.last-visited-countries" />
          </Title>
          {countries.nodes.map((node) => (
            <PaperCountryCompact key={node.id} {...node} />
          ))}
        </View>
      </View>
    </LayoutPage>
  )
}

export default Home

export const pageQuery = graphql`
  query Home($slug: String!, $locale: String!) {
    mdx(frontmatter: {slug: {eq: $slug}}) {
      excerpt
      frontmatter {
        text1
        text2
        text3
      }
    }
    activities: allStravaActivity(
      filter: {
        map: {summary_polyline: {ne: null}}
        visibility: {eq: "everyone"}
      }
      sort: {distance: DESC}
      limit: 3
    ) {
      nodes {
        id
        ...PaperActivityFragment
      }
    }
    stravaAthlete {
      tilesTimeline {
        yearMonth
        square {
          x
          y
          size
        }
        new {
          x
          y
        }
      }
    }
    climbs: allClimbsJson(sort: {difficulty: DESC}, limit: 10) {
      nodes {
        id
        name
        strava_id
      }
    }
    stories: allMdx(
      sort: {frontmatter: {date: DESC}}
      filter: {
        frontmatter: {template: {eq: "travel-story"}, locale: {eq: $locale}}
      }
      limit: 3
    ) {
      nodes {
        id
        ...PaperStoryFragment
      }
    }
    countries: allMdx(
      filter: {
        frontmatter: {locale: {eq: $locale}, template: {eq: "travel-country"}}
        fields: {photosCount: {gt: 0}}
      }
      sort: {fields: {lastVisitDate: DESC}}
      limit: 3
    ) {
      nodes {
        id
        ...PaperCountryFragment
      }
    }
    travelYoutube: youtubeVideo(id: {eq: "7QH5Cih_BBU"}) {
      id
      ...PaperVideoFragment
    }
    sportYoutube: youtubeVideo(id: {eq: "eWLtXALpskQ"}) {
      id
      ...PaperVideoFragment
    }
    sportPhotos: allCloudinaryMedia(
      filter: {fields: {category: {eq: "sport"}}}
    ) {
      nodes {
        id
        ...PaperPhotoFragment
      }
    }
  }
`
