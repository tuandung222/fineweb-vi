import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const config: Config = {
  title: 'Báo cáo Kỹ thuật FineWeb',
  tagline: 'Bản dịch tiếng Việt "FineWeb: decanting the web for the finest text data at scale" của HuggingFace',
  favicon: 'img/logo.svg',

  // Set the production url of your site here
  url: 'https://tuandung222.github.io',
  // Set the /<projectName>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/fineweb-vi/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'tuandung222', // Usually your GitHub org/user name.
  projectName: 'fineweb-vi', // Usually your repo name.

  onBrokenLinks: 'warn',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'vi',
    locales: ['vi'],
  },

  future: {
    v4: true,
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: ['@docusaurus/theme-mermaid'],

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-n8MVdqiI7+t84GBSAlkZFP3qxmcArtr2WwHXYQJ90R9xg1f1TXEipb_mAGPge5yG',
      crossorigin: 'anonymous',
    },
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/logo.svg',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'FineWeb Report VI',
      logo: {
        alt: 'FineWeb Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Báo cáo kỹ thuật',
        },
        {
          href: 'https://github.com/tuandung222/fineweb-vi',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Nội dung',
          items: [
            {
              label: 'Giới thiệu',
              to: '/docs/gioi_thieu',
            },
            {
              label: 'Dữ liệu Web & Nền tảng',
              to: '/docs/category/web-data',
            },
            {
              label: 'Công thức FineWeb',
              to: '/docs/category/fineweb-recipe',
            },
          ],
        },
        {
          title: 'Nâng cao',
          items: [
            {
              label: 'FineWeb-Edu',
              to: '/docs/category/fineweb-edu',
            },
            {
              label: 'Biến động & Dữ dữ liệu tổng hợp',
              to: '/docs/category/commoncrawl-temporal',
            },
          ],
        },
        {
          title: 'Cộng đồng',
          items: [
            {
              label: 'Hugging Face FineWeb',
              href: 'https://huggingface.co/datasets/HuggingFaceFW/fineweb',
            },
            {
              label: 'GitHub Repository',
              href: 'https://github.com/tuandung222/fineweb-vi',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Báo cáo Kỹ thuật FineWeb VI. Bản dịch tiếng Việt từ Hugging Face.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['python', 'bash', 'json', 'yaml'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
