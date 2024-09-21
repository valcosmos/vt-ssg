import type { FrontMatter, PageData } from '@shared/types'
import type { Route } from '../node/plugin-routes'
import { matchRoutes } from 'react-router-dom'
import { routes } from 'vt-ssg:routes'
import siteData from 'vt-ssg:site-data'

export async function initPageData(routePath: string): Promise<PageData> {
  const matched = matchRoutes(routes, routePath)

  if (matched) {
    const route = matched[0].route as Route
    const moduleInfo = await route.preload()

    return {
      pageType: moduleInfo.frontmatter?.pageType ?? 'doc',
      siteData,
      frontmatter: moduleInfo.frontmatter as FrontMatter,
      pagePath: routePath,
      toc: moduleInfo.toc,
    }
  }

  return {
    pageType: '404',
    siteData,
    pagePath: routePath,
    frontmatter: {},
  }
}
