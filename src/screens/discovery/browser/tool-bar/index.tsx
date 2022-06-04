/*
 * @Author: czy0729
 * @Date: 2019-06-08 04:35:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-04 12:32:47
 */
import React from 'react'
import { ToolBar as CompToolBar } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import Filter from './filter'
// import Sort from './sort'
import Back from './back'
import Year from './year'
import Month from './month'
import Next from './next'
import More from './more'

function ToolBar(props, { $ }) {
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
