import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { RouteService } from './route-service'

describe('route service', async () => {
  const testDir = join(__dirname, 'fixtures')
  const routeService = new RouteService(testDir)
  await routeService.init()

  it('conventional route by file structure', () => {
    const routeMeta = routeService.getRouteMeta().map(item => ({
      ...item,
      absolutePath: item.absolutePath.replace(testDir, 'TEST_DIR'),
    }))

    expect(routeMeta).toMatchInlineSnapshot(`
      [
        {
          "absolutePath": "TEST_DIR/guide/index.mdx",
          "routePath": "/guide/",
        },
        {
          "absolutePath": "TEST_DIR/index.mdx",
          "routePath": "/",
        },
      ]
    `)
  })

  it('generate routes code', async () => {
    expect(
      routeService
        .generateRoutesCode()
        .replaceAll(testDir, 'TEST_DIR'),
    ).toMatchInlineSnapshot(`
      "
            import React from 'react';
            import loadable from '@loadable/component';
            const Route0 = loadable(() => import('TEST_DIR/guide/index.mdx'))
      const Route1 = loadable(() => import('TEST_DIR/index.mdx'))
            export const routes = [
              { path: '/guide/', element: React.createElement(Route0) },{ path: '/', element: React.createElement(Route1) }
            ]
          "
    `)
  })
})
