/*
 * @Author: czy0729
 * @Date: 2024-03-16 04:01:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-29 12:55:45
 */
import React from 'react'
import { ToolBar as ToolBarComp } from '@components'
import { ob } from '@utils/decorators'
import More from './more'
import OnAir from './onair'
import { COMPONENT } from './ds'
import { styles } from './styles'

function ToolBar() {
  return (
    <ToolBarComp style={styles.toolBar}>
      <OnAir />
      <More />
    </ToolBarComp>
  )
}

export default ob(ToolBar, COMPONENT)
