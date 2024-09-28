import { join } from 'node:path'

export const PACKAGE_ROOT = join(__dirname, '..')

export const RUNTIME_PATH = join(PACKAGE_ROOT, 'src', 'runtime')

export const DEFAULT_TEMPLATE_PATH = join(PACKAGE_ROOT, 'template.html')

export const CLIENT_ENTRY_PATH = join(RUNTIME_PATH, 'client-entry.tsx')

export const SERVER_ENTRY_PATH = join(RUNTIME_PATH, 'ssr-entry.tsx')

export const MASK_SPLITTER = '!!SSG!!'

export const CLIENT_OUTPUT = 'build'

export const EXTERNALS = [
  'react',
  'react-dom',
  'react-dom/client',
  'react/jsx-runtime',
]
