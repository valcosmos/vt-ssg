import { usePageData } from '@runtime/hooks'
import Nav from '../components/Nav'
import '../styles/var.css'
import '../styles/base.css'
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
      <Nav />
      {
        getContent()
      }
    </div>
  )
}
