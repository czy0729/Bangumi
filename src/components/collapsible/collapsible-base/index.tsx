/*
 * @Author: czy0729
 * @Date: 2026-02-10 06:55:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-27 02:05:33
 */
import React, { useEffect, useState } from 'react'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'

import type { ReactNode } from 'react'
import type { Props } from '../types'

type InnerProps = Props & {
  CollapsibleImpl: React.ComponentType<{
    collapsed?: boolean
    renderChildrenCollapsed?: boolean
    children: ReactNode
  }>
}

function CollapsibleBase({ collapsed, children, CollapsibleImpl }: InnerProps) {
  r(COMPONENT)

  const [renderChildrenCollapsed, setRenderChildrenCollapsed] = useState(collapsed ? false : true)

  useEffect(() => {
    if (collapsed === false && renderChildrenCollapsed === false) {
      setRenderChildrenCollapsed(true)
    }
  }, [collapsed, renderChildrenCollapsed])

  return (
    <CollapsibleImpl collapsed={collapsed} renderChildrenCollapsed={renderChildrenCollapsed}>
      {children}
    </CollapsibleImpl>
  )
}

export default CollapsibleBase
