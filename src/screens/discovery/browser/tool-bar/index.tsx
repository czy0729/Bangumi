/*
 * @Author: czy0729
 * @Date: 2019-06-08 04:35:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 13:57:16
 */
import React from 'react'
import { ToolBar as CompToolBar } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import Filter from './filter'
// import Sort from './sort'
import Back from './back'
import Year from './year'
import Month from './month'
import Next from './next'
import More from './more'

function ToolBar(props, { $ }: Ctx) {
  return (
    <CompToolBar style={!$.isList && _.mb.xs}>
      <Filter />
      {/* <Sort /> */}
      <Back />
      <Year />
      <Month />
      <Next />
      <More />
    </CompToolBar>
  )
}

export default obc(ToolBar)
