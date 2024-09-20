// eslint-disable-next-line antfu/no-import-dist
import { defineConfig } from '../dist'

export default defineConfig({
  title: '123',
  description: 'xxxx',
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      { text: '指南', link: '/' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '教程',
          items: [
            {
              text: '快速上手',
              link: '/guide/a',
            },
            {
              text: '如何安装',
              link: '/guide/b',
            },
          ],
        },
      ],
    },
  },
})
