import { readFile } from 'node:fs/promises'
import type { Plugin } from 'vite'
import { CLIENT_ENTRY_PATH, DEFAULT_TEMPLATE_PATH } from '../constants'

export function pluginHtml(): Plugin {
  return {
    name: 'vt-ssg:html',
    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            tag: 'script',
            attrs: {
              type: 'module',
              src: `/@fs/${CLIENT_ENTRY_PATH}`,
            },
            injectTo: 'body',
          },
        ],
      }
    },
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          let content = await readFile(DEFAULT_TEMPLATE_PATH, 'utf-8')
          try {
            content = await server.transformIndexHtml(req.url!, content, req.originalUrl)
            res.setHeader('Content-Type', 'text/html')
            res.end(content)
          }
          catch (error) {
            next(error)
          }
        })
      }
    },
  }
}
