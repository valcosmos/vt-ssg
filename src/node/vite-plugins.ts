import type { SiteConfig } from '@shared/types'
import react from '@vitejs/plugin-react'
import { pluginMdx } from './plugin-mdx'
import { pluginRoutes } from './plugin-routes'
import { pluginConfig } from './plugins/config'
import { pluginHtml } from './plugins/html'

export async function createVitePlugins(config: SiteConfig, restart?: () => Promise<void>) {
  return [
    pluginHtml(),
    react({ jsxRuntime: 'automatic' }),
    pluginConfig(config, restart),
    pluginRoutes({
      root: config.root,
    }),
    await pluginMdx(),
  ]
}
