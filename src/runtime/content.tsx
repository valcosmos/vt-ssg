import type { RouteObject } from 'react-router-dom'
import { useRoutes } from 'react-router-dom'

const routes: RouteObject[] = [

]

export function Content() {
  const rootElement = useRoutes(routes)
  return rootElement
}
