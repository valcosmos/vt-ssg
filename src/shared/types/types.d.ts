/// <reference types="vite/client" />

declare module 'vt-ssg:site-data' {
  import type { UserConfig } from 'shared/types'

  const siteData: UserConfig
  export default siteData
}

declare module 'vt-ssg:routes' {
  import type { RouteObject } from 'react-router-dom'

  const routes: RouteObject[]
  export { routes }
}

// declare module '*.module.scss' {
//   const classes: Record<string, string>
//   export default classes
// }
