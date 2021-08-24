const path = require("path")

module.exports.onCreateNode = ({ node, actions, getNode }) => {
  // Transform the new node here and create a new node or
  // create a new node field.
  const { createNodeField } = actions
  if (node.internal.type === "MarkdownRemark") {
    const slug = path.basename(node.fileAbsolutePath, ".md")
    createNodeField({
      //same as node: node
      node,
      name: "slug",
      value: slug,
    })
  }
}

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  //dynamically create pages here
  //get path to template

  const blogTemplate = path.resolve("./src/templates/blog.js")
  const articleTemplate = path.resolve("./src/templates/article.js")

  //get slugs
  const posts = graphql(`
    query {
      allMarkdownRemark(
        filter: { frontmatter: { content_type: { eq: "post" } } }
      ) {
        edges {
          node {
            frontmatter {
              content_type
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    const allEdges = result.data.allMarkdownRemark.edges

    allEdges.forEach(edge => {
      createPage({
        component: blogTemplate,
        path: `/blog/${edge.node.fields.slug}`,
        context: {
          slug: edge.node.fields.slug,
        },
      })
    })
  })

  const articles = graphql(`
    query {
      allMarkdownRemark(
        filter: { frontmatter: { content_type: { eq: "article" } } }
      ) {
        edges {
          node {
            frontmatter {
              content_type
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    const allEdges = result.data.allMarkdownRemark.edges

    allEdges.forEach(edge => {
      createPage({
        component: articleTemplate,
        path: `/articles/${edge.node.fields.slug}`,
        context: {
          slug: edge.node.fields.slug,
        },
      })
    })
  })

  // const articleTemplate = path.resolve("./src/templates/article.js")
  // //get slugs
  // const articles = graphql(`
  //   query {
  //     allMarkdownRemark {
  //       edges {
  //         node {
  //           fields {
  //             slug
  //             collection
  //           }
  //         }
  //       }
  //     }
  //   }
  // `).then(result => {
  //   //create new pages with unique slug
  //   result.data.allMarkdownRemark.edges.forEach(edge => {
  //     createPage({
  //       component: articleTemplate,
  //       path: `/article/${edge.node.fields.slug}`,
  //       context: {
  //         slug: edge.node.fields.slug,
  //       },
  //     })
  //   })
  // })

  return Promise.all([posts, articles])
}
