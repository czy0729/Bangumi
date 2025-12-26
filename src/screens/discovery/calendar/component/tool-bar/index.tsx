/*
 * @Author: czy0729
 * @Date: 2024-03-16 04:01:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-21 22:53:15
 */
import React from 'react'
import { ToolBar as ToolBarComp } from '@components'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import OnAir from './onair'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function ToolBar() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const { adapt, tag, origin } = $.state

    return (
      <ToolBarComp style={styles.toolBar}>
        <OnAir list={$.calendar.list} adapt={adapt} tag={tag} origin={origin} />
      </ToolBarComp>
    )
  })
}

export default ToolBar
