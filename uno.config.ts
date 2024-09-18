import { defineConfig, presetAttributify, presetIcons, presetWind, transformerAttributifyJsx } from 'unocss'

export default defineConfig({
  presets: [presetAttributify(), presetWind(), presetIcons()],
  transformers: [
    transformerAttributifyJsx(),
  ],
  rules: [
    // [
    //   'divider-bottom',
    //   {
    //     'border-bottom': '1px solid var(--ssg-c-divider-light)',
    //   },
    // ],
    [
      /^divider-(\w+)$/,
      ([, w]) => ({
        [`border-${w}`]: '1px solid var(--ssg-c-divider-light)',
      }),
    ],
    [
      'menu-item-before',
      {
        'margin-right': '12px',
        'margin-left': '12px',
        'width': '1px',
        'height': '24px',
        'background-color': 'var(--ssg-c-divider-light)',
        'content': '" "',
      },
    ],
  ],
})
