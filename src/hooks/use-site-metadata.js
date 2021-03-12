import {graphql, useStaticQuery} from "gatsby"

export const useSiteMetadata = () => {
  const {
    site: {siteMetadata},
    siteImage,
  } = useStaticQuery(
    graphql`
      {
        site {
          siteMetadata {
            title
            siteUrl
          }
        }
        siteImage: googlePhotosPhoto(description: {eq: "meta-image"}) {
          photo {
            childImageSharp {
              gatsbyImageData(width: 1024, layout: FIXED, placeholder: BLURRED)
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
