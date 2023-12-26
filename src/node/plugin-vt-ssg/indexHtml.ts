import type { Plugin } from 'vite'
import fs from 'fs-extra'
import { CLIENT_ENTRY_PATH, DEFAULT_TEMPLATE_PATH } from '../constants'

export function pluginIndexHtml(): Plugin {
  return {
    name: 'vt-ssg:index-html',
    apply: 'serve',
    transformIndexHtml(html) {
      return { html, tags: [{ tag: 'script', attrs: { type: 'module', src: `/@fs/${CLIENT_ENTRY_PATH}` }, injectTo: 'body' }] }
    },
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          // 读取 template.html 内容
          let content = await fs.readFile(DEFAULT_TEMPLATE_PATH, 'utf-8')
          try {
            content = await server.transformIndexHtml(req.url, content, req.originalUrl)
            // 响应 HTML 浏览器
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html')
            res.end(content)
          }
          catch (error) {
            return next(error)
          }
        })
      }
    },
  }
}
