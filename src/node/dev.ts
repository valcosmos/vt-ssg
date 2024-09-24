import { createServer } from 'vite'
import { resolveConfig } from './config'
import { PACKAGE_ROOT } from './constants'
// import { pluginRoutes } from './plugin-routes'
// import { pluginConfig } from './plugins/config'
// import { pluginHtml } from './plugins/html'
import { createVitePlugins } from './vite-plugins'

export async function createDevServer(root: string, restartServer?: () => Promise<void>) {
  const config = await resolveConfig(root, 'serve', 'development')
  // console.log('🚀 ~ createDevServer ~ config:', config)

  return createServer({
    root,
    plugins: await createVitePlugins(config, restartServer),
    server: {
      port: 5173,
      fs: {
        allow: [PACKAGE_ROOT],
      },
    },
  })
}
