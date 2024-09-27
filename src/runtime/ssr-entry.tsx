import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'
import { DataContext } from './hooks'
import { initPageData } from './init-page-data'

export async function render(pagePath: string) {
  const pageData = await initPageData(pagePath)
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  const { clearIslandData, data } = await import('./jsx-runtime')
  const { islandProps, islandToPathMap } = data
  clearIslandData()

  const appHtml = renderToString(
    <DataContext.Provider value={pageData}>
      <StaticRouter location={pagePath}>
        <App />
      </StaticRouter>
      ,
    </DataContext.Provider>,
  )

  return {
    appHtml,
    islandProps,
    islandToPathMap,
  }
}

export { routes } from 'vt-ssg:routes'
