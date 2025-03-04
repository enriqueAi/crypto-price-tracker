// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Crypto Price Tracker Documentation',
  tagline: 'Documentation for the Crypto Price Tracker application',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://enriqueAi.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/crypto-price-tracker/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'enriqueAi', // Your GitHub username
  projectName: 'crypto-price-tracker', // Your repo name

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Update edit URL to your repository
          editUrl:
            'https://github.com/enriqueAi/crypto-price-tracker/tree/main/docs/',
        },
        blog: false, // Disable blog feature since we're not using it
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Crypto Price Tracker',
        logo: {
          alt: 'Crypto Price Tracker Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            href: 'https://github.com/enriqueAi/crypto-price-tracker',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/intro',
              },
              {
                label: 'API Integration',
                to: '/docs/api-integration',
              },
              {
                label: 'Components',
                to: '/docs/ui-components',
              },
            ],
          },
          {
            title: 'Project',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/enriqueAi/crypto-price-tracker',
              },
              {
                label: 'Issues',
                href: 'https://github.com/enriqueAi/crypto-price-tracker/issues',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Crypto Price Tracker. Built by Henry Hennings.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
