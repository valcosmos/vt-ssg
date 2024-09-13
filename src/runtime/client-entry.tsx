import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// import siteData from 'vt-ssg:site-data'
import App from './App'

function renderInBrowser() {
  const containerEl = document.getElementById('root')
  if (!containerEl)
    throw new Error('#root element not found')
  createRoot(containerEl).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  )
}

renderInBrowser()
