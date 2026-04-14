/*
 * @Author: czy0729
 * @Date: 2022-04-19 17:07:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-30 22:57:04
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ToolBar as ToolBarComp } from '@components'
import { r } from '@utils/dev'
import Filter from './filter'
import Sort from './sort'
import Status from './status'
import Year from './year'
import { COMPONENT } from './ds'

function ToolBar() {
  r(COMPONENT)

  return (
    <ToolBarComp>
      <Sort />
      <Year />
      <Filter />
      <Status />
    </ToolBarComp>
  )
}

export default observer(ToolBar)
