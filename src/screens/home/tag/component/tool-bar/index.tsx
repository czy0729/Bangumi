/*
 * @Author: czy0729
 * @Date: 2019-06-08 04:35:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-18 07:58:03
 */
import React from 'react'
import { ToolBar as ToolBarComp } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import Meta from './meta'
import Month from './month'
import More from './more'
import Sort from './sort'
import Year from './year'
import { COMPONENT } from './ds'

function ToolBar(_props, { $ }: Ctx) {
  return (
    <ToolBarComp style={!$.state.list && _.mb.sm}>
      <Sort />
      <Year />
      <Month />
      {($.tag.meta || $.state.meta) && <Meta />}
      <More />
    </ToolBarComp>
  )
}

export default obc(ToolBar, COMPONENT)
