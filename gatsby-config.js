require("dotenv").config()
module.exports = {
  siteMetadata: {
    title: "La Cotera",
    // description: "Criadores de ganado Holstein y promotores del mejoramiento genetico en Mexico",
    author: "Enrique Posada @QuiquePosada on Github"
  },
  plugins: [
    {
      resolve: "gatsby-source-contentful",
      options: {
        accessToken: process.env.CONTENTFUL_DELIVERY_API,
        spaceId: process.env.SPACE_ID,
        // downloadLocal: true
      },
    },
    {
      resolve: "gatsby-plugin-i18n",
      options: {
        langKeyDefault: "es",
        langKeyForNull: "es",
        prefixDefault: false,
        useLangKeyLayout: false
      }
    },
    "gatsby-plugin-material-ui",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    {
      // SEO
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Sta. Maria La Cotera",
        short_name: "La Cotera",
        start_url: "/",
        lang: `es`,
        background_color: `#483b3a`,
        theme_color: `#483b3a`,
        icon: "src/images/icon.png",
      },
    },
    "gatsby-transformer-remark",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "markdown",
        path: "./src/data/pages/",
      },
      __key: "markdown",
    },
  ],
};
