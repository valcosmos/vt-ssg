import type { SiteConfig } from '@shared/types'
import type { RollupOutput } from 'rollup'
import type { InlineConfig } from 'vite'
import { rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import process from 'node:process'
import pluginReact from '@vitejs/plugin-react'
import { build as viteBuild } from 'vite'
import { CLIENT_ENTRY_PATH, SERVER_ENTRY_PATH } from './constants'
import { pluginConfig } from './plugins/config'

export async function bundle(root: string, config: SiteConfig) {
  const resolveViteConfig = (isServer: boolean): InlineConfig => {
    return {
      mode: 'production',
      root,
      plugins: [pluginReact(), pluginConfig(config)],
      ssr: {
        noExternal: ['react-router-dom'],
      },
      build: {
        ssr: isServer,
        outDir: isServer ? '.temp' : 'build',
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
    const clientBuild = async () => {
      return viteBuild(resolveViteConfig(false))
    }

    const serverBuild = async () => {
      return viteBuild(resolveViteConfig(true))
    }

    const [clientBundle, serverBundle] = await Promise.all([
      clientBuild(),
      serverBuild(),
    ])

    return [clientBundle, serverBundle]
  }
  catch (error) {
    throw new Error(error as string)
  }
}

export async function renderPage(render: () => string, root: string, clientBundle?: RollupOutput) {
  const appHtml = render()
  const clientChunk = clientBundle?.output.find(chunk => chunk.type === 'chunk' && chunk.isEntry)

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

  await writeFile(join(root, 'build', 'index.html'), html, 'utf-8')
  await rm(join(root, '.temp'), { recursive: true })
}

export async function build(root: string = process.cwd(), config: SiteConfig) {
  const [clientBundle, _serverBundle] = await bundle(root, config)

  const serverEntryPath = join(root, '.temp', 'ssr-entry.cjs')

  const { render } = await import(serverEntryPath)

  await renderPage(render, root, clientBundle as RollupOutput)
}
