import { usePageData } from '@runtime/hooks'
import { useLocation } from 'react-router-dom'
import { Sidebar } from '../../components/Sidebar'

export function DocLayout() {
  const { siteData: { themeConfig } } = usePageData()
  const sidebarData = themeConfig?.sidebar || {}

  const { pathname } = useLocation()

  const matchedSidebarKey = Object.keys(sidebarData).find(key => pathname.includes(key))

  const matchedSidebar = matchedSidebarKey ? sidebarData[matchedSidebarKey] : []

  return (
    <div>
      <Sidebar sidebarData={matchedSidebar} pathname={pathname} />
    </div>
  )
}
