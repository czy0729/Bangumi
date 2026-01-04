/*
 * @Author: czy0729
 * @Date: 2022-01-06 07:42:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-02 20:59:19
 */
import React from 'react'
import { Heatmap } from '@components'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { TABS_HEADER_HEIGHT } from '@styles'
import { COMPONENT } from './ds'

function Heatmaps() {
  r(COMPONENT)

  return useObserver(() => (
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
  ))
}

export default Heatmaps
