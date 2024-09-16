import { defineConfig, presetAttributify, presetIcons, presetWind } from 'unocss'

export default defineConfig({
  presets: [presetAttributify(), presetWind(), presetIcons()],
})
