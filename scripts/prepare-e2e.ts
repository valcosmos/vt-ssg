import path, { resolve } from 'node:path'
import fs from 'fs-extra'
import { execaCommandSync , execa} from 'execa'

const exampleDir = resolve(__dirname, '../e2e/playground')
const ROOT = resolve(__dirname, '..')

async function prepareE2E() {
  if (!fs.existsSync(resolve(__dirname, '../dist'))) {
    execaCommandSync('pnpm build', {
      cwd: resolve(__dirname, '..'),
    })
  }


  // await execa('npx playwright install', {
  //   cwd: ROOT,
  // })
  console.log(process.cwd())
  console.log(exampleDir)
  execa('ll', {execPath:exampleDir, shell: true})

    // execa('pnpm',['dev'], {
    //  cwd: exampleDir,
    //   })

}

prepareE2E()
