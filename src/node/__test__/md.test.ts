import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { createHighlighter } from 'shiki'
import { unified } from 'unified'
import { describe, expect, it } from 'vitest'
import { rehypePluginPreWrapper } from '../plugin-mdx/rehype-plugins/pre-wrapper'
import { rehypePluginShiki } from '../plugin-mdx/rehype-plugins/shiki'

describe('markdown compile cases', async () => {
  const processor = unified()

  processor
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePluginPreWrapper)
    .use(rehypePluginShiki, {
      highlighter: await createHighlighter({
        themes: ['nord'],
        langs: ['js'],
      }),
    })
    .use(rehypeStringify)

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
    const mdContent = '```js\n console.log(123); \n```'
    const result = processor.processSync(mdContent)

    // expect(result.value).toMatchInlineSnapshot(`
    //   "<pre><code class="language-js">console.log(123);
    //   </code></pre>"
    // `)
    // expect(result.value).toMatchInlineSnapshot(`
    //   "<div class="language-js"><span class="lang">js</span><pre><code class="">console.log(123);
    //   </code></pre></div>"
    // `)
    expect(result.value).toMatchInlineSnapshot(`
      "<div class="language-js"><span class="lang">js</span><pre class="shiki nord" style="background-color:#2e3440ff;color:#d8dee9ff" tabindex="0"><code><span class="line"><span style="color:#D8DEE9"> console</span><span style="color:#ECEFF4">.</span><span style="color:#88C0D0">log</span><span style="color:#D8DEE9FF">(</span><span style="color:#B48EAD">123</span><span style="color:#D8DEE9FF">)</span><span style="color:#81A1C1">;</span><span style="color:#D8DEE9FF"> </span></span>
      <span class="line"></span></code></pre></div>"
    `)
  })
})
