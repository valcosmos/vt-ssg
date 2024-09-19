import { usePageData } from '@runtime/hooks'
import React from 'react'
import { HomeFeature } from '../../components/HomeFeature'
import { HomeHero } from '../../components/HomeHero'

export default function HomeLayout() {
  const { frontmatter } = usePageData()
  return (
    <div>
      { frontmatter?.hero && <HomeHero hero={frontmatter.hero} /> }
      { frontmatter?.features && <HomeFeature features={frontmatter.features} /> }
    </div>
  )
}
