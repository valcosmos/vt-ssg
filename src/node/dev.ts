import react from '@vitejs/plugin-react'
import { createServer } from 'vite'
import { pluginHtml } from './plugins/html'

export function createDevServer(root: string) {
  return createServer({ root, plugins: [pluginHtml(), react()] })
}
