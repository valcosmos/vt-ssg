import { defineConfig, presetAttributify, presetIcons, presetWind, transformerAttributifyJsx } from 'unocss'

export default defineConfig({
  presets: [presetAttributify(), presetWind(), presetIcons()],
  transformers: [
    transformerAttributifyJsx(),
  ],
  shortcuts: {
    'flex-center': 'flex justify-center items-center',
  },
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
  theme: {
    colors: {
      brandLight: 'var(--ssg-c-brand-light)',
      brandDark: 'var(--ssg-c-brand-dark)',
      brand: 'var(--ssg-c-brand)',
      text: {
        1: 'var(--ssg-c-text-1)',
        2: 'var(--ssg-c-text-2)',
        3: 'var(--ssg-c-text-3)',
        4: 'var(--ssg-c-text-4)',
      },
      divider: {
        default: 'var(--ssg-c-divider)',
        light: 'var(--ssg-c-divider-light)',
        dark: 'var(--ssg-c-divider-dark)',
      },
      gray: {
        light: {
          1: 'var(--ssg-c-gray-light-1)',
          2: 'var(--ssg-c-gray-light-2)',
          3: 'var(--ssg-c-gray-light-3)',
          4: 'var(--ssg-c-gray-light-4)',
        },
      },
      bg: {
        default: 'var(--ssg-c-bg)',
        soft: 'var(--ssg-c-bg-soft)',
        mute: 'var(--ssg-c-bg-mute)',
      },
    },
  },
})
