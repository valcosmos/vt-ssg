import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { loadConfigFromFile } from 'vite'
import type { SiteConfig, UserConfig } from '../shared/types'

type RawConfig = UserConfig | Promise<UserConfig> | (() => UserConfig | Promise<UserConfig>)

function getUserConfigPath(root: string): string {
  const supportConfigFiles = [
    'config.ts',
    'config.js',
  ]
  const configPath = supportConfigFiles.map(file => resolve(root, file)).find(existsSync)
  return configPath || ''
}

function resolveSiteData(userConfig: UserConfig): UserConfig {
  return {
    title: userConfig.title || 'vt-ssg',
    description: userConfig.description || 'SSG Framework',
    themeConfig: userConfig.themeConfig || {},
    vite: userConfig.vite || {},
  }
}

export async function resolveConfig(root: string, command: 'serve' | 'build', mode: 'development' | 'production') {
  const [configPath, userConfig] = await resolveUserConfig(root, command, mode)

  const siteConfig: SiteConfig = {
    root,
    configPath,
    siteData: resolveSiteData(userConfig as UserConfig),
  }

  return siteConfig
}

export async function resolveUserConfig(root: string, command: 'serve' | 'build', mode: 'development' | 'production') {
  const configPath = getUserConfigPath(root)
  const result = await loadConfigFromFile({ command, mode }, configPath, root)

  if (result) {
    const { config: rowConfig = {} as RawConfig } = result
    // object / promise / function
    const userConfig = await (typeof rowConfig === 'function' ? rowConfig() : rowConfig)

    return [configPath, userConfig] as const
  }

  return [configPath, {} as UserConfig] as const
}

export function defineConfig(config: UserConfig): UserConfig {
  return config
}
