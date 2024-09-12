import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { loadConfigFromFile } from 'vite'
import type { UserConfig } from '../shared/types'

type RawConfig = UserConfig | Promise<UserConfig> | (() => UserConfig | Promise<UserConfig>)

function getUserConfigPath(root: string) {
  const supportConfigFiles = [
    'config.ts',
    'config.js',
  ]
  const configPath = supportConfigFiles.map(file => resolve(root, file)).find(existsSync)
  return configPath
}

export async function resolveConfig(root: string, command: 'serve' | 'build', mode: 'development' | 'production') {
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
