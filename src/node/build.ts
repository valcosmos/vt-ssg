import { join } from 'node:path'
import type { InlineConfig } from 'vite'
import { build as viteBuild } from 'vite'
import type { RollupOutput } from 'rollup'
import fs from 'fs-extra'
import { CLIENT_ENTRY_PATH, SERVER_ENTRY_PATH } from './constant'

// const dynamicImport = new Function('m', 'return import(m)')
// const { default: ora } = await dynamicImport('ora')
// const spinner = ora()
// spinner.start(`Bundling client + server bundles...`)

export async function bundle(root: string) {
  const resolveViteConfig = (isServer: boolean): InlineConfig => ({
    mode: 'production',
    root,
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
  })

  // console.log()
  try {
    const clientBuild = async () => {
      return viteBuild(resolveViteConfig(false))
    }

    const serverBuild = async () => {
      return viteBuild(resolveViteConfig(true))
    }

    const [clientBundle, serverBundle] = await Promise.all([clientBuild(), serverBuild()])
    return [clientBundle, serverBundle]
  }
  catch (error) {}
}

export async function renderPage(render: () => string, root: string, clientBundle: RollupOutput) {
  const appHtml = render()
  const clientChunk = clientBundle.output.find(chunk => chunk.type === 'chunk' && chunk.isEntry)
  const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="root">${appHtml}</div>
    <script type="module" src="/${clientChunk.fileName}"></script>
  </body>
</html>
  `.trim()

  await fs.writeJSON(join(root, 'build', 'index.html'), html)
  await fs.remove(join(root, '.temp'))
}

export async function build(root: string) {
  // bundle  client端 + server端
  const [clientBundle, serverBundle] = await bundle(root)
  // 引入 server-entry 模块
  const serverEntryPath = join(root, '.temp', 'ssr-entry.js')
  // 服务端渲染，产出html
  const { render } = await import(serverEntryPath)
  await renderPage(render, root, clientBundle as RollupOutput)
}
