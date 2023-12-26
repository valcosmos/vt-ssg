import type { UserConfig as ViteConfiguration } from 'vite'

export interface NavItemWithLink {
  text: string
  link: string
}

export interface SidebarGroup {
  text: string
  items: SidebarItem[]
}

export interface SidebarItem {
  text: string
  link: string
}

export interface Sidebar {
  [path: string]: SidebarGroup[]
}

export interface Footer {
  message: string

}

export interface ThemeConfig {
  nav: NavItemWithLink
  sidebar?: Sidebar
  footer?: Footer
}

export interface UserConfig {
  title: string
  description: string
  themeConfig: ThemeConfig
  vite: ViteConfiguration
}
