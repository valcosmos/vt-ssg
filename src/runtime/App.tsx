import type { FrontMatter, PageData } from '@shared/types'
import type { Route } from '../node/plugin-routes'
import React from 'react'
import { matchRoutes } from 'react-router-dom'
import { routes } from 'vt-ssg:routes'
import siteData from 'vt-ssg:site-data'
import { Layout } from '../theme-default'

export async function initPageData(routePath: string): Promise<PageData> {
  const matched = matchRoutes(routes, routePath)

  if (matched) {
    const route = matched[0].route as Route
    const moduleInfo = await route.preload()

    return {
      pageType: 'doc',
      siteData,
      frontmatter: moduleInfo.frontmatter as FrontMatter,
      pagePath: routePath,
    }
  }

  return {
    pageType: '404',
    siteData,
    pagePath: routePath,
    frontmatter: {},
  }
}

export default function App() {
  return (
    <Layout />
  )
}
