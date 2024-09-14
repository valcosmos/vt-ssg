import type { Root, Text } from 'hast'
import type { BundledLanguage, Highlighter } from 'shiki'
import type { Plugin } from 'unified'
import { fromHtml } from 'hast-util-from-html'
import { visit } from 'unist-util-visit'

interface Options {
  highlighter: Highlighter
}

export const rehypePluginShiki: Plugin<[Options], Root> = ({ highlighter }) => {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName === 'pre' && node.children[0]?.type === 'element' && node.children[0]?.tagName === 'code') {
        // 语法名称 代码内容
        const codeNode = node.children[0]
        const codeContent = (codeNode.children[0] as Text).value
        const codeClassName = codeNode.properties?.className?.toString() || ''
        const lang = codeClassName.split('-')[1] as BundledLanguage
        if (!lang)
          return
        const highlightedCode = highlighter.codeToHtml(codeContent, { lang, theme: 'nord' })

        const fragmentAst = fromHtml(highlightedCode, { fragment: true })

        parent?.children.splice(index as number, 1, ...fragmentAst.children)
      }
    })
  }
}
