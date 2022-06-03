/*
 * @Author: czy0729
 * @Date: 2019-06-08 04:35:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-03 13:37:10
 */
import React from 'react'
import { ToolBar as CompToolBar } from '@components'
import { ob } from '@utils/decorators'
import Type from './type'
import Year from './year'
import Month from './month'
import Filter from './filter'
import More from './more'

function ToolBar() {
  return (
    <CompToolBar>
      <Type />
      <Year />
      <Month />
      <Filter />
      <More />
    </CompToolBar>
  )
}

export default ob(ToolBar)
