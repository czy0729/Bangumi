/*
 * @Author: czy0729
 * @Date: 2022-01-09 12:32:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-17 07:12:48
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap } from '@components'
import { _ } from '@stores'
import { TABS_HEADER_HEIGHT } from '@styles'

function Heatmaps() {
  return (
    <Heatmap
      right={_.wind + 62}
      bottom={_.window.height - TABS_HEADER_HEIGHT - 12}
      id='收藏的人物.标签页切换'
      transparent
    />
  )
}

export default observer(Heatmaps)
