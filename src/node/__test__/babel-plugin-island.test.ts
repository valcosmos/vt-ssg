// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error
import type { TransformOptions } from '@babel/core'
import os from 'node:os'
// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error
import { transformAsync } from '@babel/core'
import { describe, expect, it } from 'vitest'
import { MASK_SPLITTER } from '../../node/constants'
import babelPluginSSG from '../babel-plugin-ssg'

const isWindows = os.platform() === 'win32'

describe('babel-plugin-ssg', () => {
  // import Aside from '../Comp/index';
  const SSG_PATH = '../Comp/index'
  // 模拟 Windows 路径
  const prefix = isWindows ? 'C:' : ''
  const IMPORTER_PATH = `${prefix}/User/project/test.tsx`
  const babelOptions: TransformOptions = {
    filename: IMPORTER_PATH,
    presets: ['@babel/preset-react'],
    plugins: [babelPluginSSG],
  }

  it('should compile jsx identifier', async () => {
    const code = `import Aside from '${SSG_PATH}'; export default function App() { return <Aside __ssg />; }`

    const result = await transformAsync(code, babelOptions)

    expect(result?.code).toContain(
      `__ssg: "${SSG_PATH}${MASK_SPLITTER}${IMPORTER_PATH}"`,
    )
  })

  it('should compile jsx member expression', async () => {
    const code = `import A from '${SSG_PATH}'; export default function App() { return <A.B __ssg />; }`

    const result = await transformAsync(code, babelOptions)

    expect(result?.code).toContain(
      `__ssg: "${SSG_PATH}${MASK_SPLITTER}${IMPORTER_PATH}"`,
    )
  })
})
