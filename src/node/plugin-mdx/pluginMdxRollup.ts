import type { Plugin } from 'vite'
import mdx from '@mdx-js/rollup'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGFM from 'remark-gfm'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { createHighlighter } from 'shiki'
import { rehypePluginPreWrapper } from './rehype-plugins/pre-wrapper'
import { rehypePluginShiki } from './rehype-plugins/shiki'

export async function pluginMdxRollup(): Promise<Plugin> {
  return mdx({
    remarkPlugins: [
      remarkGFM,
      remarkFrontmatter,
      [remarkMdxFrontmatter, { name: 'frontmatter' }],
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          properties: { class: 'header-anchor' },
          content: {
            type: 'text',
            value: '#',
          },
        },
      ],
      rehypePluginPreWrapper,
      [
        rehypePluginShiki,
        {
          highlighter: await createHighlighter({
            themes: ['nord'],
            langs: ['js'],
          }),
        },
      ],
    ],
  }) as unknown as Plugin
}
