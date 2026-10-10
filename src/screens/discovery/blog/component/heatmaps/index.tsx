/*
 * @Author: czy0729
 * @Date: 2022-01-06 07:42:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-11 12:00:00
 *
 * 埋点
 */
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
        id='全站日志.标签页切换'
        transparent
      />
      <Heatmap
        right={_.wind}
        bottom={_.window.height - TABS_HEADER_HEIGHT - 12}
        id='全站日志.标签页点击'
        transparent
      />
    </>
  )
}

export default observer(Heatmaps)
