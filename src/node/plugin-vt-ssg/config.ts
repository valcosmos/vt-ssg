import { relative } from 'node:path'
import type { Plugin, ViteDevServer } from 'vite'
import type { SiteConfig } from 'shared/types'

const SITE_DATA_ID = 'vt-ssg:site-data'

export function pluginConfig(config: SiteConfig): Plugin {
  let server: ViteDevServer | null = null
  return {
    name: 'vt-ssg:config',
    resolveId(id) {
      if (id === SITE_DATA_ID) {
        return `\0${SITE_DATA_ID}`
      }
    },
    load(id) {
      if (id === `\0${SITE_DATA_ID}`) {
        return `export default ${JSON.stringify(config.siteData)}`
      }
    },
    configureServer(s) {
      server = s
    },
    async handleHotUpdate(ctx) {
      const customWatchedFiles = [config.configPath]
      const include = (id: string) => customWatchedFiles.some(file => id.includes(file))
      if (include(ctx.file)) {
        console.log(`\n${relative(config.root, ctx.file)}changed, restarting server...`)
        // 重启 Dev server
        // 插件内重启vite 的 dev server
        // await server.restart() //没有作用 没有对vt-ssg框架配置的重新读取

        // 手动调用dev.ts 中的createServer
      }
    },
  }
}
