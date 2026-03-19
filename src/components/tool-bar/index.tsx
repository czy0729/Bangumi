/*
 * @Author: czy0729
 * @Date: 2021-01-25 11:50:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 14:32:08
 */
import React from 'react'
import { observer } from 'mobx-react'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { Component } from '../component'
import { Flex } from '../flex'
import ToolBarIcon from './icon'
import ToolBarPopover from './popover'
import ToolBarTouchable from './touchable'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { IToolBar } from './types'
export type { IToolBar }

/** 列表上方辅助选项工具条 */
const ToolBar: IToolBar = observer(({ style, children, ...other }) => {
  r(COMPONENT)

  const styles = memoStyles()

  return (
    <Component id='component-tool-bar'>
      <Flex style={stl(styles.toolBar, style)} justify='center' {...other}>
        {children}
      </Flex>
    </Component>
  )
})

ToolBar.Icon = ToolBarIcon
ToolBar.Popover = ToolBarPopover
ToolBar.Touchable = ToolBarTouchable

export { ToolBar }
export default ToolBar
