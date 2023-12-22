import { readFile } from 'node:fs/promises'
import type { Plugin } from 'vite'
import { CLIENT_ENTRY_PATH, DEFAULT_TEMPLATE_PATH } from '../constant'

export function pluginIndexHtml(): Plugin {
  return {
    name: 'island:index-html',
    transformIndexHtml(html) {
      return { html, tags: [{ tag: 'script', attrs: { type: 'module', src: `/@fs/${CLIENT_ENTRY_PATH}` }, injectTo: 'body' }] }
    },
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          // 读取 template.html 内容
          let content = await readFile(DEFAULT_TEMPLATE_PATH, 'utf-8')
          content = await server.transformIndexHtml(req.url, content, req.originalUrl)
          // 响应 HTML 浏览器
          res.setHeader('Content-Type', 'text/html')
          res.end(content)
        })
      }
    },
  }
}
