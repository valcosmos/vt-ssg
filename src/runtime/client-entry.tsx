import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// import siteData from 'vt-ssg:site-data'
import App from './App'
import { DataContext } from './hooks'
import { initPageData } from './init-page-data'

async function renderInBrowser() {
  const containerEl = document.getElementById('root')
  if (!containerEl)
    throw new Error('#root element not found')

  const pageData = await initPageData(location.pathname)

  createRoot(containerEl).render(
    <DataContext.Provider value={pageData}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DataContext.Provider>,
  )
}

renderInBrowser()
