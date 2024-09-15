import type { Plugin } from 'vite'
import { pluginMdxHmr } from './pluginMdxHmr'
import { pluginMdxRollup } from './pluginMdxRollup'

export async function pluginMdx(): Promise<Plugin[]> {
  return [await pluginMdxRollup(), pluginMdxHmr()]
}
