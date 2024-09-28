import type { ComponentType } from 'react'
import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// import siteData from 'vt-ssg:site-data'
import App from './App'
import { DataContext } from './hooks'
import { initPageData } from './init-page-data'

declare global {
  interface Window {
    SSG: Record<string, ComponentType<unknown>>
    SSG_PROPS: unknown[]
  }
}

async function renderInBrowser() {
  const containerEl = document.getElementById('root')
  if (!containerEl)
    throw new Error('#root element not found')
  if (import.meta.env.DEV) {
    const pageData = await initPageData(location.pathname)
    createRoot(containerEl).render(
      <DataContext.Provider value={pageData}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DataContext.Provider>,
    )
  }
  else {
    // 生产环境下的 Partial Hydration
    const ssgEL = document.querySelectorAll('[__ssg]')
    if (ssgEL.length === 0) {
      return
    }
    for (const ssg of ssgEL) {
      // Aside:0
      const [id, index] = ssg.getAttribute('__ssg')!.split(':')
      const Element = window.SSG[id] as ComponentType<unknown>
      // eslint-disable-next-line ts/ban-ts-comment
      // @ts-expect-error
      hydrateRoot(ssg, <Element {...window.SSG_PROPS[index]} />)
    }
  }
}

renderInBrowser()
