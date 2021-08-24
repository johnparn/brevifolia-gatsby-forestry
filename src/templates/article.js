import React from "react"
import Layout from "../components/Layout"
import { graphql, Link } from "gatsby"
import useArticleData from "../static_queries/useArticleData"
import articleTemplateStyles from "../styles/templates/article.module.scss"
//this component handles the blur img & fade-ins
import Img from "gatsby-image"
import { GatsbyImage } from "gatsby-plugin-image"
import { Remark } from "react-remark"

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
        <div className={articleTemplateStyles.blog__info}>
          <h1>{data.frontmatter.title}</h1>
          <p>{data.frontmatter.date}</p>
          {data.frontmatter.image && (
            <div style={{ border: "5px solid #000" }}>
              <Img fluid={data.frontmatter.image.childImageSharp.fluid} />
            </div>
          )}
          <Remark>{data.frontmatter.content}</Remark>
        </div>
        {/* <p>{JSON.stringify(data)}</p> */}
        <hr />
        <p>
          {JSON.stringify(data.frontmatter.friskfaktorer)}{" "}
          {JSON.stringify(data.frontmatter.activity)}
        </p>
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
      frontmatter {
        title
        content
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
