const visit = require("unist-util-visit")

// gatsby-remark-strava (run as a gatsbyRemarkPlugin) turns the Strava embed
// link into a `html`-type mdast node containing a `<strava ... />` tag,
// meant to be compiled by MDX into a real <StravaEmbed /> component (see
// `strava: StravaEmbed` in the MDXProvider components map).
//
// Since the MDX v2 upgrade, gatsby-plugin-mdx's own `remarkMdxHtmlPlugin`
// runs right after every gatsbyRemarkPlugin and rewrites any `html`/`raw`
// node into `<span dangerouslySetInnerHTML={{__html: "..."}} />` instead of
// feeding it back through the MDX/JSX compiler. That leaves `<strava>` as
// inert markup the browser doesn't know how to render.
//
// This rehype plugin runs after that rewrite and restores the intended
// `<strava attr="value" ... />` JSX element from the injected HTML string.
const STRAVA_TAG_REGEX = /<strava\s([\s\S]*?)\/>/
const ATTRIBUTE_REGEX = /([\w-]+)="([^"]*)"/g

const getInnerHtml = (node) =>
  node.attributes?.[0]?.value?.data?.estree?.body?.[0]?.expression
    ?.properties?.[0]?.value?.value

module.exports.rehypeStrava = () => (tree) => {
  visit(tree, "mdxJsxFlowElement", (node) => {
    if (node.name !== "span") {
      return
    }

    const html = getInnerHtml(node)
    const stravaTagMatch =
      typeof html === "string" && html.match(STRAVA_TAG_REGEX)

    if (!stravaTagMatch) {
      return
    }

    const attributes = []
    let attributeMatch

    ATTRIBUTE_REGEX.lastIndex = 0
    while ((attributeMatch = ATTRIBUTE_REGEX.exec(stravaTagMatch[1]))) {
      const [, name, value] = attributeMatch
      attributes.push({type: "mdxJsxAttribute", name, value})
    }

    node.name = "strava"
    node.attributes = attributes
  })
}
