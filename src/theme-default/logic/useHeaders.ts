import type { Header } from '@shared/types'
import { useEffect, useState } from 'react'

export function useHeaders(initHeaders?: Header[]) {
  const [headers, setHeaders] = useState(initHeaders)

  useEffect(() => {
    if (import.meta.env.DEV) {
      import.meta.hot?.on('mdx-changed', ({ filePath }: { filePath: string }) => {
        import(/* @vite-ignore */`${filePath}?import&t=${Date.now()}`).then((module) => {
          setHeaders(module.toc)
        })
      })
    }
  })

  return headers
}
