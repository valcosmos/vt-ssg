import type { PageData } from '@shared/types'
import { createContext, useContext } from 'react'

export const DataContext = createContext({} as PageData)

export function usePageData() {
  return useContext(DataContext)
}
