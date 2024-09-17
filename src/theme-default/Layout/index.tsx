import { usePageData } from '@runtime/hooks'
import 'uno.css'

export function Layout() {
  const { pageType } = usePageData()

  const getContent = () => {
    if (pageType === 'home') {
      return <div>主页内容</div>
    }
    if (pageType === 'doc') {
      return <div>Content</div>
    }
    if (pageType === '404') {
      return <div>404</div>
    }
  }

  return (
    <div>
      <div>Nav</div>
      {
        getContent()
      }
    </div>
  )
}
