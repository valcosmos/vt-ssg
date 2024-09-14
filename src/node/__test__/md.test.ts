import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { describe, expect, it } from 'vitest'

describe('markdown compile cases', async () => {
  const processer = unified()

  processer.use(remarkParse).use(remarkRehype).use(rehypeStringify)

  it('compile title', async () => {
    const mdContent = '# 123'
    const result = processer.processSync(mdContent)
    expect(result.value).toMatchInlineSnapshot(`"<h1>123</h1>"`)
  })

  it('compile code', async () => {
    const mdContent = 'I am using `vt-ssg`'
    const result = processer.processSync(mdContent)
    expect(result.value).toMatchInlineSnapshot(`"<p>I am using <code>vt-ssg</code></p>"`)
  })
})
