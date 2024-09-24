import type { SiteConfig } from '@shared/types'
import react from '@vitejs/plugin-react'
import pluginUnocss from 'unocss/vite'
import { pluginMdx } from './plugin-mdx'
import { pluginRoutes } from './plugin-routes'
import { pluginConfig } from './plugins/config'
import { pluginHtml } from './plugins/html'

export async function createVitePlugins(config: SiteConfig, restartServer?: () => Promise<void>, isSSR?: boolean) {
  return [
    pluginUnocss({
      configFile: '../../uno.config.ts',
    }),
    pluginHtml(),
    react({ jsxRuntime: 'automatic' }),
    pluginConfig(config, restartServer),
    pluginRoutes({
      root: config.root,
      isSSR,
    }),
    await pluginMdx(),
  ]
}
