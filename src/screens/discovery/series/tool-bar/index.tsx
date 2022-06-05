/*
 * @Author: czy0729
 * @Date: 2022-04-19 17:07:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-05 12:18:22
 */
import React from 'react'
import { ToolBar as CompToolBar } from '@components'
import { ob } from '@utils/decorators'
import Sort from './sort'
import Year from './year'
import Filter from './filter'
import Status from './status'
import More from './more'

function ToolBar() {
  return (
    <CompToolBar>
      <Sort />
      <Year />
      <Filter />
      <Status />
      <More />
    </CompToolBar>
  )
}

export default ob(ToolBar)
