/*
 * @Author: czy0729
 * @Date: 2023-09-23 07:03:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-22 04:19:12
 */
import React from 'react'
import { ToolBar as CompToolBar } from '@components'
import { ob } from '@utils/decorators'
import Sort from './sort'
import Type from './type'
import Tag from './tag'
import { styles } from './styles'

function ToolBar() {
  return (
    <CompToolBar style={styles.toolBar}>
      <Sort />
      <Type />
      <Tag />
    </CompToolBar>
  )
}

export default ob(ToolBar)
