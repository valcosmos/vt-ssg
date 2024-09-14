import mdx from '@mdx-js/rollup'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGFM from 'remark-gfm'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { rehypePluginPreWrapper } from './rehype-plugins/pre-wrapper'

export function pluginMdxRollup() {
  return [mdx({
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
    ],
  })]
}
