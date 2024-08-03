/*
 * @Author: czy0729
 * @Date: 2022-06-25 17:18:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 03:24:30
 */
import React, { useEffect, useState } from 'react'
import CollapsibleComponent from 'react-native-collapsible'
import { r } from '@utils/dev'
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
    if (!collapsed && renderChildrenCollapsed === false) {
      setRenderChildrenCollapsed(true)
    }
  }, [collapsed, renderChildrenCollapsed])

  return (
    <CollapsibleComponent collapsed={collapsed} renderChildrenCollapsed={renderChildrenCollapsed}>
      {children}
    </CollapsibleComponent>
  )
}

export default Collapsible
