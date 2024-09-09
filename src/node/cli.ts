import cac from 'cac'
import { build } from './build'
import { createDevServer } from './dev'

const cli = cac('vt-ssg').version('0.0.1').help()

cli.command('dev [root]', 'start dev server').action(async (root: string) => {
  const server = await createDevServer(root)
  await server.listen()
  server.printUrls()
})

cli.command('build [root]', 'build in production').action(async (root: string) => {
  await build(root)
})

cli.parse()
