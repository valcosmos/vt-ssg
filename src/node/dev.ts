import react from '@vitejs/plugin-react'
import { createServer } from 'vite'
import { PACKAGE_ROOT } from './constants'
import { pluginHtml } from './plugins/html'

export function createDevServer(root: string) {
  return createServer({
    root,
    plugins: [pluginHtml(), react()],
    server: {
      port: 5173,
      fs: {
        allow: [PACKAGE_ROOT],
      },
    },
  })
}
