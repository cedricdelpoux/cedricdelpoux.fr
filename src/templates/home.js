import {
  faAddressCard,
  faBriefcase,
  faCode,
  faEarthEurope,
  faFilm,
  faMountains,
  faNewspaper,
  faPersonRunning,
  faPhotoFilm,
  faRoute,
} from "@fortawesome/pro-light-svg-icons"
import {ThemeContext} from "css-system"
import {graphql} from "gatsby"
import React, {useContext} from "react"
import {FormattedMessage} from "react-intl"

import {AnimationCode} from "../components/animation-code"
import {AnimationSport} from "../components/animation-sport"
import {AnimationTravel} from "../components/animation-travel"
import {Avatar} from "../components/avatar"
import {Button} from "../components/button"
import {Html} from "../components/html"
import {Link} from "../components/link"
import {ListNumber} from "../components/list-number"
import {PaperActivityCompact} from "../components/paper-activity"
import {PaperCountryCompact} from "../components/paper-country"
import {PaperPhoto} from "../components/paper-photo"
import {PaperStoryCompact} from "../components/paper-story"
import {PaperVideoCompact} from "../components/paper-video"
import {Slideshow} from "../components/slideshow"
import {Text} from "../components/text"
import {Title} from "../components/title"
import {View} from "../components/view"
import {useMenu} from "../hooks/use-menu"
import {LayoutPage} from "../layouts/page"
import {getStravaActivityUrl} from "../utils/strava"

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
    googleDocs: {
      childMdx: {body, excerpt},
      text1,
      text2,
      text3,
    },
    activities,
    climbs,
    stories,
    countries,
    youtubeCyclingPyrenees,
    youtubeBretagne,
    sportAlbum,
  },
  pageContext: {locale},
}) => {
  const theme = useContext(ThemeContext)
  const menu = useMenu(locale)
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
      <Html body={body} css={{textAlign: "center"}} fluid />

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
              {...youtubeCyclingPyrenees}
              css={{
                height: {_: "auto", m: 140},
                width: {_: 335, s: 350, m: "auto"},
                aspectRatio: "16 / 9",
              }}
            />
            {sportAlbum?.photos?.length > 0 && (
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
                {sportAlbum?.photos.map((node) => (
                  <PaperPhoto
                    key={node.id}
                    photo={node.file}
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
      <View
        css={{
          flexDirection: {_: "column", m: "row"},
          alignSelf: "stretch",
          gap: 3,
        }}
      >
        <View css={{flex: 1, gap: 2}}>
          <Title as="h3">
            <FormattedMessage id="home.last-activities" />
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
          <PaperVideoCompact {...youtubeBretagne} />
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
  query Home($path: String!, $locale: String!) {
    googleDocs(slug: {eq: $path}) {
      childMdx {
        body
        excerpt
      }
      text1
      text2
      text3
    }
    activities: allStravaActivity(
      filter: {
        map: {summary_polyline: {ne: null}}
        visibility: {eq: "everyone"}
      }
      sort: {fields: [start_date], order: DESC}
      limit: 3
    ) {
      nodes {
        id
        ...PaperActivityFragment
      }
    }
    climbs: allClimbsJson(sort: {fields: difficulty, order: DESC}, limit: 10) {
      nodes {
        id
        name
        strava_id
      }
    }
    stories: allGoogleDocs(
      sort: {fields: date, order: DESC}
      filter: {template: {eq: "travel-story"}, locale: {eq: $locale}}
      limit: 3
    ) {
      nodes {
        id
        ...PaperStoryFragment
      }
    }
    countries: allGoogleDocs(
      filter: {
        locale: {eq: $locale}
        template: {eq: "travel-country"}
        album: {id: {ne: null}}
      }
      sort: {fields: album___latestDate, order: DESC}
      limit: 3
    ) {
      nodes {
        id
        ...PaperCountryFragment
      }
    }
    youtubeBretagne: youtubeVideo(title: {eq: "Le tour de la Bretagne"}) {
      id
      ...PaperVideoFragment
    }
    youtubeCyclingPyrenees: youtubeVideo(
      title: {eq: "Ma traversée des Pyrénées en vélo"}
    ) {
      id
      ...PaperVideoFragment
    }
    sportAlbum: googlePhotosAlbum(category: {eq: "sport"}) {
      photos {
        id
        ...PaperPhotoFragment
      }
    }
  }
`
