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
    // {
    //   resolve: "gatsby-source-filesystem",
    //   options: {
    //     name: "posts",
    //     path: `${__dirname}/content/posts`,
    //   },
    // },
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
          // {
          //   resolve: `gatsby-plugin-lunr`,
          //   options: {
          //     languages: [
          //       {
          //         name: "articles",
          //         // filterNodes: node => node.frontmatter.lang === "en",
          //         // Add to index custom entries, that are not actually extracted from gatsby nodes
          //         // customEntries: [
          //         //   {
          //         //     title: "Pictures",
          //         //     content: "awesome pictures",
          //         //     url: "/pictures",
          //         //   },
          //         // ],
          //       },
          //       // {
          //       //   name: "fr",
          //       //   filterNodes: node => node.frontmatter.lang === "fr",
          //       // },
          //     ],
          //     // Fields to index. If store === true value will be stored in index file.
          //     // Attributes for custom indexing logic. See https://lunrjs.com/docs/lunr.Builder.html for details
          //     // fields: [
          //     //   { name: "title", store: true, attributes: { boost: 20 } },
          //     //   { name: "content" },
          //     //   { name: "url", store: true },
          //     // ],
          //     // How to resolve each field's value for a supported node type
          //     resolvers: {
          //       // For any node of type MarkdownRemark, list how to resolve the fields' values
          //       MarkdownRemark: {
          //         title: node => node.frontmatter.title,
          //         content: node => node.html,
          //         url: node => node.fields.url,
          //       },
          //     },
          //     // //custom index file name, default is search_index.json
          //     // filename: "search_index.json",
          //     // //custom options on fetch api call for search_ındex.json
          //     // fetchOptions: {
          //     //   credentials: "same-origin",
          //     // },
          //   },
          // },
          // "gatsby-remark-relative-images",
          {
            resolve: "gatsby-plugin-robots-txt",
            options: {
              policy: [{ userAgent: "*", disallow: ["/"] }],
            },
          },
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
