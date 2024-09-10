import { join } from 'node:path'
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [join('src', 'node', 'cli.ts')],
  bundle: true,
  splitting: true,
  outDir: 'dist',
  format: ['cjs', 'esm'],
  dts: true,
  shims: true,
})
