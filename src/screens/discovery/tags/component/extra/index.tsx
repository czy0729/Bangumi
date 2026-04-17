/*
 * @Author: czy0729
 * @Date: 2024-04-05 04:52:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-17 12:54:27
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap } from '@components'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { TABS_HEADER_HEIGHT } from '@styles'
import { COMPONENT } from './ds'

function Extra() {
  r(COMPONENT)

  return (
    <Heatmap
      right={_.wind}
      bottom={_.window.height - TABS_HEADER_HEIGHT - 12}
      id='标签索引.标签页切换'
      transparent
    />
  )
}

export default observer(Extra)
