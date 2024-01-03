import { createServer } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { pluginIndexHtml } from './plugin-vt-ssg/indexHtml'
import { PACKAGE_ROOT } from './constants'
import { resolveConfig } from './config'

export async function createDevServer(root: string) {
  const config = await resolveConfig(root, 'serve', 'development')
  console.log(config)
  return createServer({
    root,
    plugins: [pluginIndexHtml(), react()],
    server: {
      fs: {
        allow: [PACKAGE_ROOT],
      },
    },
  })
}
