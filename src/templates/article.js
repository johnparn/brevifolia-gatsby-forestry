import React from "react"
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import useArticleData from "../static_queries/useArticleData"
import articleTemplateStyles from "../styles/templates/article.module.scss"
//this component handles the blur img & fade-ins
import Img from "gatsby-image"

export default function Article(props) {
  const data = props.data.markdownRemark
  const allArticleData = useArticleData()
  const nextSlug = getNextSlug(data.fields.slug)

  function getNextSlug(slug) {
    const allSlugs = allArticleData.map(article => {
      return article.node.fields.slug
    })
    const nextSlug = allSlugs[allSlugs.indexOf(slug) + 1]
    if (nextSlug !== undefined && nextSlug !== "") {
      return nextSlug
    } else {
      return allSlugs[0]
    }
  }

  return (
    <Layout>
      <article className={articleTemplateStyles.blog}>
        <section style={{ padding: "1rem", textAlign: "right" }}>
          {data.frontmatter.friskfaktorer} {data.frontmatter.activity}
        </section>
        <div className={articleTemplateStyles.blog__info}>
          <h1>{data.frontmatter.title}</h1>
          <p>{data.frontmatter.date}</p>
          {data.frontmatter.image && (
            <div style={{ border: "5px solid #000" }}>
              <Img fluid={data.frontmatter.image.childImageSharp.fluid} />
            </div>
          )}
          <section
            dangerouslySetInnerHTML={{
              __html: data.html,
            }}
          ></section>
        </div>
        <hr />
      </article>
    </Layout>
  )
}

//dynamic page query, must occur within each post context
//$slug is made available by context from createPages call in gatsby-node.js
export const getArticleData = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      html
      frontmatter {
        title
        content
        friskfaktorer
        activity
        # image
        image {
          base
          name
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
    }
  }
`
