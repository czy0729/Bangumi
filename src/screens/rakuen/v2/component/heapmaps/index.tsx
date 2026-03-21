/*
 * @Author: czy0729
 * @Date: 2020-12-16 01:24:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 02:54:21
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap } from '@components'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { TABS_HEADER_HEIGHT } from '@styles'
import { COMPONENT } from './ds'

function Heatmaps() {
  r(COMPONENT)

  return (
    <>
      <Heatmap
        right={_.wind + 62}
        bottom={_.window.height - TABS_HEADER_HEIGHT - 12}
        id='超展开.标签页切换'
        transparent
      />
      <Heatmap
        right={_.wind}
        bottom={_.window.height - TABS_HEADER_HEIGHT - 12}
        id='超展开.标签页点击'
        transparent
      />
      <Heatmap bottom={_.bottom} id='超展开' screen='Rakuen' />
    </>
  )
}

export default observer(Heatmaps)
