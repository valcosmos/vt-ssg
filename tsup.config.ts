import process from 'node:process'
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./src/node/cli.ts', './src/node/index.ts', './src/node/dev.ts'],
  bundle: true,
  splitting: true,
  outDir: 'dist',
  minify: process.env.NODE_ENV === 'production',
  format: ['cjs', 'esm'],
  dts: true,
  shims: true,
  clean: true,
})
