/*
 * @Author: czy0729
 * @Date: 2022-04-19 17:07:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-02 17:17:43
 */
import React from 'react'
import { ToolBar as ToolBarComp } from '@components'
import { ob } from '@utils/decorators'
import Filter from './filter'
import More from './more'
import Sort from './sort'
import Status from './status'
import Year from './year'
import { COMPONENT } from './ds'

function ToolBar() {
  return (
    <ToolBarComp>
      <Sort />
      <Year />
      <Filter />
      <Status />
      <More />
    </ToolBarComp>
  )
}

export default ob(ToolBar, COMPONENT)
