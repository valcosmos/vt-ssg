import { createServer } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { pluginIndexHtml } from './plugin-vt-ssg/indexHtml'
import { PACKAGE_ROOT } from './constants'
import { resolveConfig } from './config'
import { pluginConfig } from './plugin-vt-ssg/config'

export async function createDevServer(root: string) {
  const config = await resolveConfig(root, 'serve', 'development')
  console.log(config.siteData)
  return createServer({
    root,
    plugins: [pluginIndexHtml(), react(), pluginConfig(config)],
    server: {
      fs: {
        allow: [PACKAGE_ROOT],
      },
    },
  })
}
