import React from "react"
import { Link } from "gatsby"
import useArticleData from "../static_queries/useArticleData"
import articleListStyles from "../styles/components/articlelist.module.scss"
import Img from "gatsby-image"
import { Remark } from "react-remark"

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
                  <div className={articleListStyles.list__info}>
                    <h2>{article.node.frontmatter.title}</h2>
                    <h3>{article.node.frontmatter.date}</h3>
                    <Remark>{article.node.frontmatter.content}</Remark>
                    {/* <div
                      dangerouslySetInnerHTML={{
                        __html: article.node.frontmatter.content,
                      }}
                    ></div> */}
                    {/* <MDXRenderer>
                      {article.node.frontmatter.content}
                    </MDXRenderer> */}
                    <p>{article.node.frontmatter.friskfaktorer}</p>
                    <p>{article.node.frontmatter.activity}</p>
                  </div>
                </li>
                {/* <li
                  className={articleListStyles.li}
                  key={article.node.fields.slug}
                >
                   {blog.node.frontmatter.hero_image && (
                    <div className={blogListStyles.list__hero}>
                      <Img
                        fluid={
                          blog.node.frontmatter.hero_image.childImageSharp.fluid
                        }
                        alt={blog.node.frontmatter.title}
                      />
                    </div>
                  )}
                  {article.node.frontmatter.image && (
                    <div className={articleListStyles.list__hero}>
                      <Img
                        width="360px"
                        fluid={
                          article.node.frontmatter.image.childImageSharp.fluid
                        }
                        alt={article.node.frontmatter.title}
                      />
                    </div>
                  )}
                  <div className={articleListStyles.list__info}>
                    <h2>{article.node.frontmatter.title}</h2>
                    <p>{article.node.frontmatter.date}</p>
                    <h3>{article.node.frontmatter.content}</h3>
                    {/* <p>{article.node.excerpt}</p>
                    <p>{article.node.frontmatter.friskfaktorer}</p>
                    <p>{article.node.frontmatter.activity}</p>
                  </div>
                </li> */}
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
