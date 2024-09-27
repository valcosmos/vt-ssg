import type { SiteConfig } from '@shared/types'
import { join } from 'node:path'
import react from '@vitejs/plugin-react'
import pluginUnocss from 'unocss/vite'
import babelPluginSsg from './babel-plugin-ssg'
import { PACKAGE_ROOT } from './constants'
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
    react({
      jsxRuntime: 'automatic',
      jsxImportSource: isSSR ? join(PACKAGE_ROOT, 'src', 'runtime') : 'react',
      babel: {
        plugins: [babelPluginSsg],
      },
    }),
    pluginConfig(config, restartServer),
    pluginRoutes({
      root: config.root,
      isSSR,
    }),
    await pluginMdx(),
  ]
}
