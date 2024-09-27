import { usePageData } from '@runtime/hooks'
import { Content } from '@runtime/index'
import { useLocation } from 'react-router-dom'
import Aside from '../../components/Aside'
import { DocFooter } from '../../components/DocFooter'
import { Sidebar } from '../../components/Sidebar'
import styles from './index.module.scss'

export function DocLayout() {
  const { siteData: { themeConfig }, toc } = usePageData()
  const sidebarData = themeConfig?.sidebar || {}

  const { pathname } = useLocation()

  const matchedSidebarKey = Object.keys(sidebarData).find(key => pathname.includes(key))

  const matchedSidebar = matchedSidebarKey ? sidebarData[matchedSidebarKey] : []

  return (
    <div>
      <Sidebar sidebarData={matchedSidebar} pathname={pathname} />

      <div className={styles.content} flex>
        <div className={styles['doc-content']}>
          <div className="ssg-doc">
            <Content />
          </div>
          <DocFooter />
        </div>

        <div className={styles['aside-container']}>
          <Aside headers={toc} __ssg />
        </div>
      </div>
    </div>
  )
}
