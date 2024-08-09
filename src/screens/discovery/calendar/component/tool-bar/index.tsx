/*
 * @Author: czy0729
 * @Date: 2024-03-16 04:01:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-09 08:53:40
 */
import React from 'react'
import { ToolBar as ToolBarComp } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import More from './more'
import OnAir from './onair'
import { COMPONENT } from './ds'
import { styles } from './styles'

function ToolBar(props, { $ }: Ctx) {
  const { adapt, tag, origin } = $.state
  return (
    <ToolBarComp style={styles.toolBar}>
      <OnAir list={$.calendar.list} adapt={adapt} tag={tag} origin={origin} />
      {/* <All /> */}
      <More />
    </ToolBarComp>
  )
}

export default obc(ToolBar, COMPONENT)
