/*
 * @Author: czy0729
 * @Date: 2023-09-23 07:03:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-09-23 11:01:40
 */
import React from 'react'
import { ToolBar as CompToolBar } from '@components'
import { IconTouchable } from '@_'
import { obc } from '@utils/decorators'
import { STORYBOOK } from '@constants'
import { Ctx } from '../types'
import Sort from './sort'
import Type from './type'

function ToolBar(props, { $ }: Ctx) {
  return (
    <CompToolBar>
      <Sort />
      <Type />
      {STORYBOOK && <IconTouchable name='md-refresh' onPress={$.onHeaderRefresh} />}
    </CompToolBar>
  )
}

export default obc(ToolBar)
