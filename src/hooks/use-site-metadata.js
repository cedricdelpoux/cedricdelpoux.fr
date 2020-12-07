import {useStaticQuery, graphql} from "gatsby"

export const useSiteMetadata = () => {
  const {
    site: {siteMetadata},
    siteImage,
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            siteUrl
          }
        }
        siteImage: googlePhotosPhoto(description: {eq: "meta-image"}) {
          photo {
            childImageSharp {
              fixed(width: 1024) {
                src
              }
            }
          }
        }
      }
    `
  )
  return {
    ...siteMetadata,
    siteImage: siteImage?.photo,
  }
}
