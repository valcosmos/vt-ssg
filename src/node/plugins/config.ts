import type { SiteConfig } from 'shared/types'
import type { Plugin } from 'vite'
import { join, relative } from 'node:path'
import { PACKAGE_ROOT } from 'node/constants'

const SITE_DATA_ID = 'vt-ssg:site-data'

export function pluginConfig(config: SiteConfig, restart?: () => Promise<void>): Plugin {
  // let server: ViteDevServer | null = null

  return {
    name: 'vt-ssg:site-data',
    resolveId(id) {
      if (id === SITE_DATA_ID) {
        // 虚拟模块 以 \0 开头
        return `\0${SITE_DATA_ID}`
      }
    },
    load(id) {
      if (id === `\0${SITE_DATA_ID}`) {
        return `export default ${JSON.stringify(config.siteData)}`
      }
    },
    // configureServer(s) {
    //   server = s
    // },
    async handleHotUpdate(ctx) {
      const customWatchedFiles = [config.configPath]
      const include = (id: string) => customWatchedFiles.some(file => id.includes(file))
      if (include(ctx.file)) {
        // eslint-disable-next-line no-console
        console.log(`\n${relative(config.root, ctx.file)} changed, restarting server...`)
        // 插件内重启vite server
        // await server?.restart()
        await restart?.()
      }
    },
    config() {
      return {
        resolve: {
          alias: {
            '@runtime': join(PACKAGE_ROOT, 'src', 'runtime'),
          },
        },
      }
    },
  }
}
