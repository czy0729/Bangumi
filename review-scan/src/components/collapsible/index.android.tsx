/*
 * @Author: czy0729
 * @Date: 2022-06-25 17:18:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-07 06:38:29
 */
import React, { useEffect, useState } from 'react'
import { r } from '@utils/dev'
import RNCollapsible from './collapsible'
import { COMPONENT } from './ds'
import { Props as CollapsibleProps } from './types'

export { CollapsibleProps }

/**
 * 自动判断高度的折叠组件，可替代手风琴
 * @doc https://github.com/oblador/react-native-collapsible
 */
export function Collapsible({ collapsed, children }: CollapsibleProps) {
  r(COMPONENT)

  const [renderChildrenCollapsed, setRenderChildrenCollapsed] = useState(collapsed ? false : true)
  useEffect(() => {
    if (collapsed === false && renderChildrenCollapsed === false) {
      setRenderChildrenCollapsed(true)
    }
  }, [collapsed, renderChildrenCollapsed])

  return (
    <RNCollapsible collapsed={collapsed} renderChildrenCollapsed={renderChildrenCollapsed}>
      {children}
    </RNCollapsible>
  )
}

export default Collapsible
