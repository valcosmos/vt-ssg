import type { NavItemWithLink } from '@shared/types'
import { usePageData } from '@runtime/hooks'
import React from 'react'
import { SwitchAppearance } from '../SwitchAppearance'
import styles from './index.module.scss'

function MenuItem({ item: { link, text } }: { item: NavItemWithLink }) {
  return (
    <div text-sm font-medium mx-3>
      <a href={link} className={styles.link}>{ text }</a>
    </div>
  )
}

export default function Nav() {
  const { siteData } = usePageData()
  const nav = siteData.themeConfig?.nav || []

  return (
    <header fixed pos="t-0 l-0" w="full" z-10>
      <div flex="~" items="center" justify="between" className={`h-14 ${styles.nav}`} divider-bottom>
        <div>
          <a href="/" className="h-full w-full flex items-center text-base font-semibold" hover="opacity-60">vt-ssg</a>
        </div>

        <div flex>
          <div flex>{nav.map(item => <MenuItem item={item} key={item.text} />) }</div>
          <div before="menu-item-before" flex>
            <SwitchAppearance />
          </div>
          <div before="menu-item-before" className={styles['social-link-icon']} ml-2>
            <a href="/">
              <i className="i-carbon-logo-github inline-block h-5 w-5 fill-current"></i>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
