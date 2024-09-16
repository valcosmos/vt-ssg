import type { Plugin } from 'vite'
import { RouteService } from './route-service'

export interface Route {
  path: string
  element: React.ReactElement
  filePath: string
}

interface PluginOptions {
  root: string
  isSSR?: boolean
}

export const CONVENTIONAL_ROUTE_ID = 'vt-ssg:routes'

export function pluginRoutes(options: PluginOptions): Plugin {
  const routeService = new RouteService(options.root)

  return {
    name: 'vt-ssg:routes',
    async configResolved() {
      await routeService.init()
    },
    resolveId(id) {
      if (id === CONVENTIONAL_ROUTE_ID) {
        return `\0${CONVENTIONAL_ROUTE_ID}`
      }
    },
    load(id) {
      if (id === `\0${CONVENTIONAL_ROUTE_ID}`) {
        // return `export const routes = []`
        return routeService.generateRoutesCode(options.isSSR || false)
      }
    },
  }
}
