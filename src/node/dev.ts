import react from '@vitejs/plugin-react'
import { createServer } from 'vite'
import { resolveConfig } from './config'
import { PACKAGE_ROOT } from './constants'
import { pluginRoutes } from './plugin-routes'
import { pluginConfig } from './plugins/config'
import { pluginHtml } from './plugins/html'

export async function createDevServer(root: string, restart?: () => Promise<void>) {
  const config = await resolveConfig(root, 'serve', 'development')
  // console.log('🚀 ~ createDevServer ~ config:', config)

  return createServer({
    root,
    plugins: [
      pluginHtml(),
      react({ jsxRuntime: 'automatic' }),
      pluginConfig(config, restart),
      pluginRoutes({
        root: config.root,
      }),
    ],
    server: {
      port: 5173,
      fs: {
        allow: [PACKAGE_ROOT],
      },
    },
  })
}
