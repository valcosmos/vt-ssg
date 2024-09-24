import { useRoutes } from 'react-router-dom'
import { routes } from 'vt-ssg:routes'

export default function Content() {
  const routeElement = useRoutes(routes)
  return routeElement
}
