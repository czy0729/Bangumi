/*
 * @Author: czy0729
 * @Date: 2022-01-09 12:32:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-09 18:05:50
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { Heatmap } from '@components'
import { _ } from '@stores'

function Heatmaps() {
  return useObserver(() => (
    <Heatmap
      right={_.wind + 62}
      bottom={_.window.height - _.tabsHeaderHeight - 12}
      id='收藏的人物.标签页切换'
      transparent
    />
  ))
}

export default Heatmaps
