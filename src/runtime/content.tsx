import { useRoutes } from 'react-router-dom'
import { routes } from 'vt-ssg:routes'

export function Content() {
  const rootElement = useRoutes(routes)
  return rootElement
}
