/*
 * @Author: czy0729
 * @Date: 2021-01-25 11:50:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-05 19:41:36
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex } from '../flex'
import { memoStyles } from './styles'
import { ToolBarIcon } from './icon'
import { ToolBarPopover } from './popover'
import { ToolBarTouchable } from './touchable'

const ToolBar = observer(({ style, children, ...other }) => {
  const styles = memoStyles()
  return (
    <Flex style={[styles.toolBar, style]} justify='center' {...other}>
      {children}
    </Flex>
  )
})

// @ts-ignore
ToolBar.Icon = ToolBarIcon

// @ts-ignore
ToolBar.Popover = ToolBarPopover

// @ts-ignore
ToolBar.Touchable = ToolBarTouchable

export { ToolBar }
