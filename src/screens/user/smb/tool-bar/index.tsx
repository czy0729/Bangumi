/*
 * @Author: czy0729
 * @Date: 2023-09-23 07:03:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-18 10:08:33
 */
import React from 'react'
import { ToolBar as CompToolBar } from '@components'
import { ob } from '@utils/decorators'
import Sort from './sort'
import Type from './type'

function ToolBar() {
  return (
    <CompToolBar>
      <Sort />
      <Type />
    </CompToolBar>
  )
}

export default ob(ToolBar)
