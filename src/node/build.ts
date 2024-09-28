import type { RenderResult } from '@runtime/ssr-entry'
import type { SiteConfig } from '@shared/types'
import type { RollupOutput } from 'rollup'
import type { InlineConfig } from 'vite'
import type { Route } from './plugin-routes'
import { mkdir, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import process from 'node:process'
import { build as viteBuild } from 'vite'
import { CLIENT_ENTRY_PATH, MASK_SPLITTER, SERVER_ENTRY_PATH } from './constants'
import { createVitePlugins } from './vite-plugins'

export async function bundle(root: string, config: SiteConfig) {
  const resolveViteConfig = async (isServer: boolean): Promise<InlineConfig> => {
    return {
      mode: 'production',
      root,
      // plugins: [pluginReact(), pluginConfig(config)],
      plugins: await createVitePlugins(config, undefined, isServer),
      ssr: {
        noExternal: ['react-router-dom', 'lodash-es'],
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
      css: {
        preprocessorOptions: {
          scss: {
            api: 'modern-compiler', // or "modern", "legacy"
            importers: [
              // ...
            ],
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

async function buildSsg(root: string, ssgToPathMap: Record<string, string>) {
  // 根据 ssgToPathMap 拼接模块代码内容
  const ssgInjectCode = `
    ${Object.entries(ssgToPathMap)
        .map(
          ([ssgName, ssgPath]) =>
            `import { ${ssgName} } from '${ssgPath}';`,
        )
        .join('')}
window.ssgS = { ${Object.keys(ssgToPathMap).join(', ')} };
window.ssg_PROPS = JSON.parse(
  document.getElementById('ssg-props').textContent
);
  `
  const injectId = 'ssg:inject'
  return viteBuild({
    mode: 'production',
    build: {
      // 输出目录
      outDir: join(root, '.temp'),
      rollupOptions: {
        input: injectId,
      },
    },
    plugins: [
      // 重点插件，用来加载我们拼接的 ssgs 注册模块的代码
      {
        name: 'ssg:inject',
        enforce: 'post',
        resolveId(id) {
          if (id.includes(MASK_SPLITTER)) {
            const [originId, importer] = id.split(MASK_SPLITTER)
            return this.resolve(originId, importer, { skipSelf: true })
          }

          if (id === injectId) {
            return id
          }
        },
        load(id) {
          if (id === injectId) {
            return ssgInjectCode
          }
        },
        // 对于 ssgs Bundle，我们只需要 JS 即可，其它资源文件可以删除
        generateBundle(_, bundle) {
          for (const name in bundle) {
            if (bundle[name].type === 'asset') {
              delete bundle[name]
            }
          }
        },
      },
    ],
  })
}

export async function renderPage(render: (pagePath: string) => RenderResult, root: string, clientBundle?: RollupOutput, routes?: Route[]) {
  // const appHtml = render()
  const clientChunk = clientBundle?.output.find(chunk => chunk.type === 'chunk' && chunk.isEntry)

  if (!routes)
    return
  await Promise.all(routes.map(async (route) => {
    const routePath = route.path
    const { appHtml, ssgToPathMap } = await render(routePath)
    buildSsg(root, ssgToPathMap)
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
