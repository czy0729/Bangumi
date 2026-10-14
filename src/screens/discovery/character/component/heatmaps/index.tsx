/*
 * @Author: czy0729
 * @Date: 2022-01-09 12:32:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 标签页切换热区
 */
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
