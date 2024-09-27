import type { Header, PropsWithSSG } from '@shared/types'
import React, { useEffect, useRef } from 'react'
import { bindingAsideScroll, scrollToTarget } from '../../logic/asideScroll'
import { useHeaders } from '../../logic/useHeaders'

interface AsideProps {
  headers?: Header[]

}

export default function Aside({ headers: rawHeaders }: AsideProps & PropsWithSSG) {
  const headers = useHeaders(rawHeaders)

  const hasOutline = headers && headers?.length > 0
  const markerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const unbinding = bindingAsideScroll()

    return () => {
      unbinding?.()
    }
  }, [])

  const renderHeader = (header: Header) => {
    return (
      <li key={header.id}>
        <a
          href={`#${header.id}`}
          block
          leading-7
          text-text-2
          className="hover:text-text-1"
          transition="color duration-300"
          style={{ paddingLeft: (header.depth - 2) * 12 }}
          onClick={(e) => {
            e.preventDefault()
            const target = document.getElementById(header.id)
            target && scrollToTarget(target, false)
          }}
        >
          {header.text}
        </a>
      </li>
    )
  }
  return (
    <div flex flex-col flex-1 style={{ width: 'var(--ssg-aside-width)' }}>
      <div>
        {hasOutline && (
          <div id="aside-container" relative divider-left pl-4 text-13px font-medium>
            <div
              ref={markerRef}
              id="aside-marker"
              absolute
              top-33px
              opacity-0
              w-1px
              h-18px
              bg-brand
              style={{ left: '-1px', transition: 'top 0.25s cubic-bezier(0, 1, 0.5, 1), background-color 0.5s, opacity 0.25s' }}
            >

            </div>

            <div>
              ON THIS PAGE
            </div>

            <nav>
              <ul relative>
                { headers?.map(renderHeader) }
              </ul>
            </nav>
          </div>
        ) }
      </div>
    </div>
  )
}
