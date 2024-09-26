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
        .generateRoutesCode(true)
        .replaceAll(testDir, 'TEST_DIR'),
    ).toMatchInlineSnapshot(`
      "
            import React from 'react';
            
            import Route0 from 'TEST_DIR/guide/index.mdx'
      import Route1 from 'TEST_DIR/index.mdx'
            export const routes = [
              { path: '/guide/', element: React.createElement(Route0), preload: () => import('TEST_DIR/guide/index.mdx') },
      { path: '/', element: React.createElement(Route1), preload: () => import('TEST_DIR/index.mdx') }
            ]
          "
    `)
  })
})
