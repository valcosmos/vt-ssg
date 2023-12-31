import { resolve } from 'node:path'
import cac from 'cac'
import { createDevServer } from './dev'
import { build } from './build'

const cli = cac('vt-ssg').version('0.0.1').help()

cli.command('dev [root]', 'start dev server').action(async (root: string) => {
  const server = await createDevServer(root)
  await server.listen()
  server.printUrls()
})

cli.command('build [root]', 'build in production').action(async (root: string) => {
  root = resolve(root)
  await build(root)
})

cli.parse()
