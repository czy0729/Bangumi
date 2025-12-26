/*
 * @Author: czy0729
 * @Date: 2022-01-09 12:32:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-24 19:42:25
 */
import React from 'react'
import { Heatmap } from '@components'
import { _ } from '@stores'
import { useObserver } from '@utils/hooks'
import { TABS_HEADER_HEIGHT } from '@styles'

function Heatmaps() {
  return useObserver(() => (
    <Heatmap
      right={_.wind + 62}
      bottom={_.window.height - TABS_HEADER_HEIGHT - 12}
      id='收藏的人物.标签页切换'
      transparent
    />
  ))
}

export default Heatmaps
