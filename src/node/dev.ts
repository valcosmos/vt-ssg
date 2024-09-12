import react from '@vitejs/plugin-react'
import { createServer } from 'vite'
import { resolveConfig } from './config'
import { PACKAGE_ROOT } from './constants'
import { pluginHtml } from './plugins/html'

export async function createDevServer(root: string) {
  const _config = await resolveConfig(root, 'serve', 'development')

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
