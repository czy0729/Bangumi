/*
 * @Author: czy0729
 * @Date: 2023-09-23 07:03:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-04 21:08:01
 */
import React from 'react'
import { ToolBar as ToolBarComp } from '@components'
import { ob } from '@utils/decorators'
import { WEB } from '@constants'
import Sort from './sort'
import Tag from './tag'
import Type from './type'
import { COMPONENT } from './ds'
import { styles } from './styles'

function ToolBar() {
  return (
    <ToolBarComp style={styles.toolBar}>
      <Sort />
      <Type />
      {WEB && <Tag />}
    </ToolBarComp>
  )
}

export default ob(ToolBar, COMPONENT)
