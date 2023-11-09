/*
 * 长列表上方辅助选项工具条
 * @Author: czy0729
 * @Date: 2021-01-25 11:50:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-09 14:15:50
 */
import React from 'react'
import { observer } from 'mobx-react'
import { stl } from '@utils'
import { Component } from '../component'
import { Flex } from '../flex'
import { memoStyles } from './styles'
import { ToolBarIcon } from './icon'
import { ToolBarPopover } from './popover'
import { ToolBarTouchable } from './touchable'
import { IToolBar } from './types'

const ToolBar: IToolBar = observer(({ style, children, ...other }) => {
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

export { ToolBar, IToolBar }
