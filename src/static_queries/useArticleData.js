import { graphql, useStaticQuery } from "gatsby"

export default function useArticleData() {
  const data = useStaticQuery(graphql`
    query getArticleData {
      allMarkdownRemark(
        sort: { order: DESC, fields: frontmatter___date }
        filter: { frontmatter: { content_type: { eq: "article" } } }
      ) {
        edges {
          node {
            id
            html
            excerpt(pruneLength: 200)
            frontmatter {
              date(formatString: "YYYY-MM-DD")
              title
              #content
              #activity
              #friskfaktorer
              # image
              image_caption
              image {
                id
                #   base
                #   name
                childImageSharp {
                  fluid {
                    base64
                    src
                    srcSet
                    aspectRatio
                    sizes
                  }
                }
              }
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  return data.allMarkdownRemark.edges
}
