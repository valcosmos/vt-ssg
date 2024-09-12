import react from '@vitejs/plugin-react'
import { createServer } from 'vite'
import { resolveConfig } from './config'
import { PACKAGE_ROOT } from './constants'
import { pluginConfig } from './plugins/config'
import { pluginHtml } from './plugins/html'

export async function createDevServer(root: string, restart?: () => Promise<void>) {
  const config = await resolveConfig(root, 'serve', 'development')
  // console.log('🚀 ~ createDevServer ~ config:', config)

  return createServer({
    root,
    plugins: [pluginHtml(), react(), pluginConfig(config, restart)],
    server: {
      port: 5173,
      fs: {
        allow: [PACKAGE_ROOT],
      },
    },
  })
}
