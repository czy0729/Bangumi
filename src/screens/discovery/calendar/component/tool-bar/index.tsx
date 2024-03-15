/*
 * @Author: czy0729
 * @Date: 2024-03-16 04:01:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-16 04:16:44
 */
import React from 'react'
import { ToolBar as ToolBarComp } from '@components'
import { ob } from '@utils/decorators'
import Layout from './layout'
import Type from './type'
import { COMPONENT } from './ds'

function ToolBar() {
  return (
    <ToolBarComp>
      <Type />
      <Layout />
    </ToolBarComp>
  )
}

export default ob(ToolBar, COMPONENT)
