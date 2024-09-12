import type { Plugin } from 'vite'
import { readFile } from 'node:fs/promises'
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
          let html = await readFile(DEFAULT_TEMPLATE_PATH, 'utf-8')
          try {
            html = await server.transformIndexHtml(req.url!, html, req.originalUrl)
            res.statusCode = 200
            res.setHeader('html-Type', 'text/html')
            res.end(html)
          }
          catch (error) {
            return next(error)
          }
        })
      }
    },
  }
}
