/*
 * @Author: czy0729
 * @Date: 2021-01-25 11:50:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-28 07:25:46
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex } from '../flex'
import { memoStyles } from './styles'
import { ToolBarIcon } from './icon'
import { ToolBarPopover } from './popover'
import { ToolBarTouchable } from './touchable'
import { IToolBar } from './types'

const ToolBar: IToolBar = observer(({ style, children, ...other }) => {
  const styles = memoStyles()
  return (
    <Flex style={[styles.toolBar, style]} justify='center' {...other}>
      {children}
    </Flex>
  )
})

ToolBar.Icon = ToolBarIcon

ToolBar.Popover = ToolBarPopover

ToolBar.Touchable = ToolBarTouchable

export { ToolBar }
