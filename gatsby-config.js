require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
const config = require("./config.json")
const infoData = require("./content/data/info.json")

module.exports = {
  //this makes the site config available to forestry cms
  siteMetadata: {
    title: config.title,
    description: config.description,
    repoUrl: config.repository_url,
    about: config.about,
    contact: config.contact,
    primaryColor: config.primary_color,
    infoData: infoData,
    siteUrl: process.env.SITE_URL,
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-yaml",
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        excludes: [],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "src",
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "articles",
        path: `${__dirname}/content/articles`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `${__dirname}/content/posts`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "data",
        path: `${__dirname}/content/data`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "images",
        path: `${__dirname}/content/images`,
      },
    },
    // `gatsby-plugin-image`,
    {
      resolve: "gatsby-plugin-sharp",
      options: {
        defaultQuality: 75,
      },
    },
    `gatsby-transformer-sharp`,
    // {
    //   resolve: "gatsby-remark-images",
    //   options: {
    //     maxWidth: 1000,
    //     linkImagesToOriginal: true,
    //   },
    // },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          // "gatsby-remark-relative-images",
          "gatsby-remark-normalize-paths",
          // {
          //   resolve: "gatsby-remark-normalize-paths",
          //   options: {
          //     pathFields: [
          //       "images",
          //       `${__dirname}/content/images`,
          //       `/content/images`,
          //     ],
          //   },
          // },
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1000,
              linkImagesToOriginal: false,
              wrapperStyle:
                "border: 5px solid #000; margin-left: 0 !important; margin-right: 0 !important;",
            },
          },
          `gatsby-transformer-sharp`,
          // `gatsby-plugin-image`,
        ],
      },
    },
  ],
}
