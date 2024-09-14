import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { describe, expect, it } from 'vitest'
import { rehypePluginPreWrapper } from '../plugin-mdx/rehype-plugins/pre-wrapper'

describe('markdown compile cases', async () => {
  const processor = unified()

  processor.use(remarkParse).use(remarkRehype).use(rehypeStringify).use(rehypePluginPreWrapper)

  it('compile title', async () => {
    const mdContent = '# 123'
    const result = processor.processSync(mdContent)
    expect(result.value).toMatchInlineSnapshot(`"<h1>123</h1>"`)
  })

  it('compile code', async () => {
    const mdContent = 'I am using `vt-ssg`'
    const result = processor.processSync(mdContent)
    expect(result.value).toMatchInlineSnapshot(`"<p>I am using <code>vt-ssg</code></p>"`)
  })

  it('compile code block', () => {
    const mdContent = '```js\nconsole.log(123);\n```'
    const result = processor.processSync(mdContent)

    // expect(result.value).toMatchInlineSnapshot(`
    //   "<pre><code class="language-js">console.log(123);
    //   </code></pre>"
    // `)
    expect(result.value).toMatchInlineSnapshot(`
      "<div class="language-js"><span class="lang">js</span><pre><code class="">console.log(123);
      </code></pre></div>"
    `)
  })
})
