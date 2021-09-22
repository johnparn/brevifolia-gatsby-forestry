import React from "react"
import Layout from "../components/Layout"
import BlogList from "../components/BlogList"
import ArticlesList from "../components/ArticlesList"
// import { StorkInput } from "gatsby-plugin-stork"

export default function IndexPage() {
  return (
    <Layout page="home" bgColor="inherit">
      {/* <section>
        <StorkInput filename="firstIndex.st" placeholder="🔍" />
      </section> */}
      <section>
        <ArticlesList />
        <BlogList />
      </section>
    </Layout>
  )
}
