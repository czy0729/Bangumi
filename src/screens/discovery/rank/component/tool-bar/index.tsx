/*
 * @Author: czy0729
 * @Date: 2019-06-08 04:35:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-28 04:30:21
 */
import React from 'react'
import { ToolBar as ToolBarComp } from '@components'
import { ob } from '@utils/decorators'
import Filter from './filter'
import Month from './month'
import More from './more'
import Type from './type'
import Year from './year'
import { COMPONENT } from './ds'

function ToolBar() {
  return (
    <ToolBarComp>
      <Type />
      <Year />
      <Month />
      <Filter />
      <More />
    </ToolBarComp>
  )
}

export default ob(ToolBar, COMPONENT)
