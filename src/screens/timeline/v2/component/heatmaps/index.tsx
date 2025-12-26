/*
 * @Author: czy0729
 * @Date: 2020-12-16 22:31:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-24 19:42:45
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
        id='时间胶囊.标签页切换'
        transparent
      />
      <Heatmap
        right={_.wind}
        bottom={_.window.height - TABS_HEADER_HEIGHT - 12}
        id='时间胶囊.标签页点击'
        transparent
      />
      <Heatmap bottom={_.bottom} id='时间胶囊' screen='Timeline' />
    </>
  )
}

export default ob(Heatmaps, COMPONENT)
