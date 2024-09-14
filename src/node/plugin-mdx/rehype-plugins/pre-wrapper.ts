import type { Element, Root } from 'hast'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

export const rehypePluginPreWrapper: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'pre' && node.children[0]?.type === 'element' && node.children[0]?.tagName === 'code' && !(node.data as any)?.isVisited) {
        const codeNode = node.children[0]
        const codeClassName = codeNode.properties?.className?.toString() || ''
        const lang = codeClassName.split('-')[1]
        // codeNode.properties.className = ''

        const clonedNode: Element = {
          type: 'element',
          tagName: 'pre',
          properties: {},
          children: node.children,
          data: {
            isVisited: true,
          } as any,
        }

        node.tagName = 'div'
        node.properties = node.properties || {}
        node.properties.className = codeClassName

        node.children = [
          {
            type: 'element',
            tagName: 'span',
            properties: {
              className: 'lang',
            },
            children: [
              {
                type: 'text',
                value: lang,
              },
            ],
          },
          clonedNode,
        ]
      }
    })
  }
}
