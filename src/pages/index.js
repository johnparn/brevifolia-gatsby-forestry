import React from "react"
import Layout from "../components/Layout"
import BlogList from "../components/BlogList"
import ArticlesList from "../components/ArticlesList"

export default function IndexPage() {
  return (
    <Layout page="home" bgColor="inherit">
      <section>
        <ArticlesList />
        <BlogList />
      </section>
    </Layout>
  )
}
