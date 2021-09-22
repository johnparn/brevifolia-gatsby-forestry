import React from "react"
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import useArticleData from "../static_queries/useArticleData"
import articleTemplateStyles from "../styles/templates/article.module.scss"
//this component handles the blur img & fade-ins
import Img from "gatsby-image"
import { StaticImage } from "gatsby-plugin-image"

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
          {data.frontmatter.articles_teasers_2 &&
            data.frontmatter.articles_teasers_2.length > 0 && (
              <section
                style={{
                  width: "30%",
                  backgroundColor: "#e0e0e0",
                  float: "right",
                  padding: "1.5rem",
                  border: "0px",
                  borderRadius: "0.5rem",
                  fontFamily: "helvetica, arial, verdana, sans-serif",
                }}
              >
                <h2
                  style={{
                    color: "#f15700",
                    fontWeight: "600",
                    paddingBottom: "0.5rem",
                    borderBottom: "1px solid #f15700",
                  }}
                >
                  Läs mer...
                </h2>
                <ul>
                  {data.frontmatter.articles_teasers_2.map(t => (
                    <li key={t.url}>
                      <a href={t.url}>{t.label}</a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          <section style={{ width: "65%" }}>
            <h1>{data.frontmatter.title}</h1>
            <p>{data.frontmatter.date}</p>
            {data.frontmatter.image && (
              <div style={{ border: "5px solid #000" }}>
                <StaticImage src={data.frontmatter.image} />
                <Img fluid={data.frontmatter.image.childImageSharp.fluid} />
              </div>
            )}

            <div
              dangerouslySetInnerHTML={{
                __html: data.html,
              }}
            />
          </section>
          <section style={{ padding: "1rem" }}>
            <hr />
            <Pill label={data.frontmatter.friskfaktorer} />
            <Pill label={data.frontmatter.activity} />
          </section>
        </div>
        <hr />
      </article>
    </Layout>
  )
}

const Pill = ({ label }) => (
  <button
    style={{
      display: "inline-box",
      padding: "0.5rem 1.5rem 0.5rem 1.5rem",
      borderRadius: "0.5rem",
      border: "0px",
      marginRight: "0.5rem",
      marginLeft: "0.5rem",
    }}
  >
    {label}
  </button>
)

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
        #articles_teasers_2 {
        #  label
        #  url
        #}
        title
        #content
        #friskfaktorer
        #activity
        #image
        image_caption
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
