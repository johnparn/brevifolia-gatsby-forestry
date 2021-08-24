import React from "react"
import { Link } from "gatsby"
import useArticleData from "../static_queries/useArticleData"
import articleListStyles from "../styles/components/articlelist.module.scss"
import Img from "gatsby-image"

export default function ArticleList() {
  const articleData = useArticleData()
  const renderArticleData = () => {
    return (
      <div>
        {articleData
          // .filter(article => article.node.frontmatter.title !== "")
          .map(article => {
            return (
              <Link
                to={`/articles/${article.node.fields.slug}`}
                key={article.node.id}
              >
                <li
                  className={articleListStyles.li}
                  key={article.node.fields.slug}
                >
                  {article.node.frontmatter.image && (
                    <div className={articleListStyles.list__hero}>
                      <Img
                        fluid={
                          article.node.frontmatter.image.childImageSharp.fluid
                        }
                        alt={article.node.frontmatter.title}
                      />
                    </div>
                  )}
                  <section className={articleListStyles.list__info}>
                    <h2>{article.node.frontmatter.title}</h2>
                    <h3>{article.node.frontmatter.date}</h3>

                    <div
                      className={articleListStyles.content}
                      dangerouslySetInnerHTML={{
                        __html: article.node.excerpt,
                      }}
                    ></div>

                    <div>{article.node.frontmatter.friskfaktorer}</div>
                    <div>{article.node.frontmatter.activity}</div>
                  </section>
                </li>
              </Link>
            )
          })}
      </div>
    )
  }
  return (
    <section>
      <ul className={articleListStyles.list}>{renderArticleData()}</ul>
    </section>
  )
}
