import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'
import { execaCommandSync } from 'execa'

// const getFilename = () => fileURLToPath(import.meta.url)
// const getDirname = () => path.dirname(getFilename())
// const __dirname = getDirname()

const ROOT = process.cwd()

const EXAMPLE_DIR = resolve(ROOT, 'e2e', 'playground', 'basic')

const DEFAULT_OPTIONS = {
  stdout: process.stdout,
  stdin: process.stdin,
  stderr: process.stderr,
}

async function prepareE2E() {
  if (!existsSync(resolve(ROOT, 'dist'))) {
    execaCommandSync('pnpm build', { cwd: ROOT, ...DEFAULT_OPTIONS })
  }

  // execaCommandSync('npx playwright install')

  execaCommandSync('pnpm dev', { cwd: EXAMPLE_DIR, ...DEFAULT_OPTIONS })
}

prepareE2E()
