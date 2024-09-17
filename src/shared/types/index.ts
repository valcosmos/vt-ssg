import type { ComponentType } from 'react'
import type { UserConfig as ViteConfiguration } from 'vite'

export interface NavItemWithLink {
  text: string
  link: string
}

export interface SidebarItem {
  text: string
  link: string
}

export interface SidebarGroup {
  text: string
  items: SidebarItem[]
}

export interface Sidebar {
  [path: string]: SidebarGroup
}

export interface Footer {
  message: string
}

export interface ThemeConfig {
  nav?: NavItemWithLink[]
  sidebar?: Sidebar
  footer?: Footer
}

export interface UserConfig {
  title?: string
  description?: string
  themeConfig?: ThemeConfig
  vite?: ViteConfiguration

}

export interface SiteConfig {
  root: string
  configPath: string
  siteData: UserConfig
}

export type PageType = 'home' | 'doc' | 'custom' | '404'

export interface FrontMatter {
  title?: string
  description?: string
  pageType?: PageType
  sidebar?: boolean
  outline?: boolean
}

export interface Header {
  id: string
  text: string
  depth: number
}

export interface PageData {
  siteData: UserConfig
  pagePath: string
  frontmatter: FrontMatter
  pageType: PageType
  toc?: Header[]
}

export interface PageModule extends Record<string, unknown> {
  default: ComponentType
  frontmatter?: FrontMatter
}
