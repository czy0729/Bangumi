/*
 * @Author: czy0729
 * @Date: 2024-03-16 04:01:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-28 20:50:48
 */
import React from 'react'
import { ToolBar as ToolBarComp } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import OnAir from './onair'
import { COMPONENT } from './ds'
import { styles } from './styles'

function ToolBar() {
  const { $ } = useStore<Ctx>()
  const { adapt, tag, origin } = $.state
  return (
    <ToolBarComp style={styles.toolBar}>
      <OnAir list={$.calendar.list} adapt={adapt} tag={tag} origin={origin} />
    </ToolBarComp>
  )
}

export default ob(ToolBar, COMPONENT)
