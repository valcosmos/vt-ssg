import { createServer } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { pluginIndexHtml } from './plugin-vt-ssg/indexHtml'
import { PACKAGE_ROOT } from './constants'

export function createDevServer(root: string) {
  return createServer({
    root, plugins: [pluginIndexHtml(), react()], server: {
      fs: {
        allow: [PACKAGE_ROOT]
      }
  } })
}
