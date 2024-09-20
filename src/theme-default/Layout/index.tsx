import { usePageData } from '@runtime/hooks'
import Nav from '../components/Nav'
import { DocLayout } from './DocLayout'
import HomeLayout from './HomeLayout'
import '../styles/var.css'
import '../styles/base.css'
import '../styles/doc.css'
import 'uno.css'

export function Layout() {
  const { pageType } = usePageData()

  const getContent = () => {
    if (pageType === 'home') {
      return <HomeLayout />
    }
    if (pageType === 'doc') {
      return <DocLayout />
    }
    if (pageType === '404') {
      return <div>404</div>
    }
  }

  return (
    <div>
      <Nav />
      <section style={{ paddingTop: 'var(--ssg-nav-height)' }}>
        {getContent()}
      </section>
    </div>
  )
}
