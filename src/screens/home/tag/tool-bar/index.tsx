/*
 * @Author: czy0729
 * @Date: 2019-06-08 04:35:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-30 10:59:12
 */
import React from 'react'
import { ToolBar as ToolBarComp } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import Month from './month'
import More from './more'
import Sort from './sort'
import Year from './year'

function ToolBar(props, { $ }: Ctx) {
  const { list } = $.state
  return (
    <ToolBarComp style={!list && _.mb.sm}>
      <Sort />
      <Year />
      <Month />
      <More />
    </ToolBarComp>
  )
}

export default obc(ToolBar)
