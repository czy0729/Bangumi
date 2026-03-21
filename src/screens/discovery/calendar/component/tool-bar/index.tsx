/*
 * @Author: czy0729
 * @Date: 2024-03-16 04:01:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-21 04:01:10
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ToolBar as ToolBarComp } from '@components'
import { useStore } from '@stores'
import OnAir from './onair'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function ToolBar() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { adapt, tag, origin } = $.state

  return (
    <ToolBarComp style={styles.toolBar}>
      <OnAir list={$.calendar.list} adapt={adapt} tag={tag} origin={origin} />
    </ToolBarComp>
  )
}

export default observer(ToolBar)
