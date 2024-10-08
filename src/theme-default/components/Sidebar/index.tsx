import type { SidebarGroup, SidebarItem } from '@shared/types'
import React from 'react'
import { Link } from '../Link'
import styles from './index.module.scss'

interface SidebarProps {
  sidebarData: SidebarGroup[]
  pathname: string
}

export function Sidebar({ sidebarData, pathname }: SidebarProps) {
  const renderGroupItem = (item: SidebarItem) => {
    const active = item.link === pathname
    return (
      <div ml-5>
        <div p-1 block text-sm font-medium className={active ? 'text-brand' : 'text-text-2'}>
          <Link href={item.link}>{ item.text }</Link>
        </div>
      </div>
    )
  }

  const renderGroup = (item: SidebarGroup) => {
    return (
      <section key={item.text} block not-first="divider-top mt-4">
        <div flex justify-between items-center>
          <h2 mt-3 mb-2 text="1rem text-1">{item.text}</h2>
        </div>
        <div mb-1>
          {
            item.items.map(v => <div key={v.link}>{ renderGroupItem(v) }</div>)
          }
        </div>
      </section>
    )
  }

  return (
    <div>
      <aside className={styles.sidebar}>
        <nav>
          {sidebarData.map(renderGroup) }
        </nav>
      </aside>
    </div>
  )
}
