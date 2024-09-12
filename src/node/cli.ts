import cac from 'cac'
import { build } from './build'
// import { createDevServer } from './dev'

const cli = cac('vt-ssg').version('0.0.1').help()

cli.command('dev [root]', 'start dev server').action(async (root: string) => {
  // const server = await createDevServer(root)
  // await server.listen()
  // server.printUrls()
  const createServer = async () => {
    const { createDevServer } = await import('./dev.js')
    const server = await createDevServer(root, async () => {
      await server.close()
      await createServer()
    })
    await server.listen()
    server.printUrls()
  }
  await createServer()
})

cli.command('build [root]', 'build in production').action(async (root: string) => {
  await build(root)
})

cli.parse()
