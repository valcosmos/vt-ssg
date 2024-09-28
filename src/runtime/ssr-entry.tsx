import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'
import { DataContext } from './hooks'
import { initPageData } from './init-page-data'

export interface RenderResult {
  appHtml: string
  propsData: unknown[]
  ssgToPathMap: Record<string, string>
}

export async function render(pagePath: string) {
  const pageData = await initPageData(pagePath)
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  const { clearSsgData, data } = await import('./jsx-runtime')

  clearSsgData()

  const appHtml = renderToString(
    <DataContext.Provider value={pageData}>
      <StaticRouter location={pagePath}>
        <App />
      </StaticRouter>
      ,
    </DataContext.Provider>,
  )

  const { ssgProps, ssgToPathMap } = data
  return {
    appHtml,
    ssgProps,
    ssgToPathMap,
  }
}

export { routes } from 'vt-ssg:routes'
