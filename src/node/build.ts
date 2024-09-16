import type { SiteConfig } from '@shared/types'
import type { RollupOutput } from 'rollup'
import type { InlineConfig } from 'vite'
import type { Route } from './plugin-routes'
import { mkdir, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import process from 'node:process'
import { build as viteBuild } from 'vite'
import { CLIENT_ENTRY_PATH, SERVER_ENTRY_PATH } from './constants'
import { createVitePlugins } from './vite-plugins'

export async function bundle(root: string, config: SiteConfig) {
  const resolveViteConfig = async (isServer: boolean): Promise<InlineConfig> => {
    return {
      mode: 'production',
      root,
      // plugins: [pluginReact(), pluginConfig(config)],
      plugins: await createVitePlugins(config, undefined, isServer),
      ssr: {
        noExternal: ['react-router-dom'],
      },
      build: {
        ssr: isServer,
        outDir: isServer ? join(root, '.temp') : join(root, 'build'),
        rollupOptions: {
          input: isServer ? SERVER_ENTRY_PATH : CLIENT_ENTRY_PATH,
          output: {
            format: isServer ? 'cjs' : 'esm',
          },
        },
      },
    }
  }

  try {
    // const clientBuild = async () => {
    //   return viteBuild(await resolveViteConfig(false))
    // }

    // const serverBuild = async () => {
    //   return viteBuild(await resolveViteConfig(true))
    // }

    const [clientBundle, serverBundle] = await Promise.all([
      viteBuild(await resolveViteConfig(false)),
      viteBuild(await resolveViteConfig(true)),
    ])

    return [clientBundle, serverBundle]
  }
  catch (error) {
    throw new Error(error as string)
  }
}

export async function renderPage(render: (pagePath: string) => string, root: string, clientBundle?: RollupOutput, routes?: Route[]) {
  // const appHtml = render()
  const clientChunk = clientBundle?.output.find(chunk => chunk.type === 'chunk' && chunk.isEntry)

  if (!routes)
    return
  await Promise.all(routes.map(async (route) => {
    const routePath = route.path
    const appHtml = render(routePath)
    const html = `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
        <div id="root">${appHtml}</div>
        <script src="/${clientChunk?.fileName}" type="module" />
      </body>
    </html>
  `.trim()
    const fileName = routePath.endsWith('/') ? `${routePath}index.html` : `${routePath}.html`
    await mkdir(join(root, 'build', dirname(fileName)), { recursive: true })
    await writeFile(join(root, 'build', fileName), html)
  }))

  await rm(join(root, '.temp'), { recursive: true })
  // await writeFile(join(root, 'build', 'index.html'), html, 'utf-8')
}

export async function build(root: string = process.cwd(), config: SiteConfig) {
  const [clientBundle, _serverBundle] = await bundle(root, config)

  const serverEntryPath = join(root, '.temp', 'ssr-entry.cjs')

  const { render, routes } = await import(serverEntryPath)

  await renderPage(render, root, clientBundle as RollupOutput, routes)
}
