/**
 * @type {import('gatsby').GatsbyConfig}
 */
require('dotenv').config();

const pathPrefix = process.env.PATH_PREFIX || '/2023';

module.exports = {
  pathPrefix,
  siteMetadata: {
    title: 'SudWeb - La conférence Web surtout Humaine',
    siteUrl: 'https://www.sudweb.fr/2023/',
  },
  plugins: [
    'gatsby-theme-material-ui-top-layout',
    'gatsby-plugin-material-ui',
    // 'gatsby-plugin-netlify-cms',
    'gatsby-plugin-netlify',
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        excludes: [
          '/code-de-conduite',
          '/erreur',
          '/example',
          '/merci-contact',
          '/merci',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1200,
            },
          },
        ],
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-plausible',
      options: {
        domain: 'sudweb.fr',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    {
      resolve: 'gatsby-plugin-webfonts',
      options: {
        fonts: {
          selfHosted: [
            {
              family: 'Oraqle Script',
              urls: {
                woff: '/src/assets/fonts/subset-OraqleScript.woff',
                woff2: '/src/assets/fonts/subset-OraqleScript.woff2',
              },
              fontDisplay: 'block',
            },
          ],
          google2: [
            {
              family: 'Plus Jakarta Sans',
              axes: 'ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700',
            },
          ],
        },
      },
    },
  ],
};
