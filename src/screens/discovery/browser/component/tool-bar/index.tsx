/*
 * @Author: czy0729
 * @Date: 2019-06-08 04:35:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-11 05:18:18
 */
import React from 'react'
import { ToolBar as ToolBarComp } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
// import Sort from './sort'
import Back from './back'
import Filter from './filter'
import Month from './month'
import More from './more'
import Next from './next'
import Year from './year'
import { COMPONENT } from './ds'

function ToolBar(props, { $ }: Ctx) {
  return (
    <ToolBarComp style={!$.isList && _.mb.xs}>
      <Filter />
      {/* <Sort /> */}
      <Back />
      <Year />
      <Month />
      <Next />
      <More />
    </ToolBarComp>
  )
}

export default obc(ToolBar, COMPONENT)
