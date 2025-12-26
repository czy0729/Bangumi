/*
 * @Author: czy0729
 * @Date: 2022-01-06 07:42:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-24 19:42:18
 */
import React from 'react'
import { Heatmap } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { TABS_HEADER_HEIGHT } from '@styles'
import { COMPONENT } from './ds'

function Heatmaps() {
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

export default ob(Heatmaps, COMPONENT)
