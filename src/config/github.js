exports.githubOptions = {
  typeName: "GitHub",
  fieldName: "github",
  token: process.env.GITHUB_TOKEN,
  graphQLQuery: `
      query {
        viewer {
          gist(name: "fc7bdb427dd574dbebcac85ad5c94792") {
            files {
              name
              text
            }
          }
          repositories(
            first: 30
            privacy: PUBLIC
            ownerAffiliations: OWNER
            orderBy: {field: STARGAZERS, direction: DESC}
          ) {
            nodes {
              id
              url
              name
              description
              stargazers {
                totalCount
              }
              forkCount
            }
          }
        }
      }
    `,
}
