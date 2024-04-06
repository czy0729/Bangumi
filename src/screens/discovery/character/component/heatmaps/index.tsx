/*
 * @Author: czy0729
 * @Date: 2022-01-09 12:32:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-06 14:33:57
 */
import React from 'react'
import { Heatmap } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

function Heatmaps() {
  return (
    <Heatmap
      right={_.wind + 62}
      bottom={_.window.height - _.tabsHeaderHeight - 12}
      id='收藏的人物.标签页切换'
      transparent
    />
  )
}

export default ob(Heatmaps)
