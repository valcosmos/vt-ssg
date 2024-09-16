import { relative } from 'node:path'
import fastGlob from 'fast-glob'
import { normalizePath } from 'vite'

interface RouteMeta {
  routePath: string
  absolutePath: string
}

export class RouteService {
  #scanDir: string
  #routeData: RouteMeta[] = []

  constructor(scanDir: string) {
    this.#scanDir = scanDir
  }

  async init() {
    const files = fastGlob.sync(['**/*.{js,jsx,ts,tsx,md,mdx}'], {
      cwd: this.#scanDir,
      absolute: true,
      ignore: ['**/build/**', '**/.vt-ssg/**', 'config.ts'],
    }).sort()

    files.forEach((file) => {
      const fileRelativePath = normalizePath(relative(this.#scanDir, file))
      const routePath = this.normalizeRoutePath(fileRelativePath)

      this.#routeData.push({
        routePath,
        absolutePath: file,
      })
    })
  }

  getRouteMeta(): RouteMeta[] {
    return this.#routeData
  }

  normalizeRoutePath(raw: string) {
    const routePath = raw.replace(/\.(.*)$/, '').replace(/index$/, '')
    return routePath.startsWith('/') ? routePath : `/${routePath}`
  }

  generateRoutesCode(ssr: boolean) {
    return `
      import React from 'react';
      ${ssr ? '' : 'import loadable from \'@loadable/component\';'}
      ${this.#routeData
          .map((route, index) => {
            return ssr
              ? `import Route${index} from '${route.absolutePath}'`
              : `const Route${index} = loadable(() => import('${route.absolutePath}'))`
          })
          .join('\n')}
      export const routes = [
        ${this.#routeData.map((route, index) => `{ path: '${route.routePath}', element: React.createElement(Route${index}) }`)}
      ]
    `
  }
}
