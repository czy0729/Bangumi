/*
 * @Author: czy0729
 * @Date: 2020-04-21 10:22:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-24 19:42:35
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
        id='首页.标签页切换'
        transparent
      />
      <Heatmap
        right={_.wind}
        bottom={_.window.height - TABS_HEADER_HEIGHT - 12}
        id='首页.标签页点击'
        transparent
      />
      <Heatmap right={_.wind + 154} bottom={_.bottom + 16} id='首页.管理收藏' transparent />
      <Heatmap right={_.wind + 288} bottom={_.bottom + 16} id='其他.启动' transparent />
      <Heatmap right={_.wind + 297} bottom={_.bottom + 50} id='其他.Linking' transparent />
      <Heatmap right={_.wind + 297} bottom={_.bottom + 85} id='其他.刷新到顶' transparent />
      <Heatmap right={_.wind + 62} bottom={_.bottom + 16} id='首页.格子布局条目选择' transparent />
      <Heatmap bottom={_.bottom} id='首页' screen='Home' />
    </>
  ))
}

export default Heatmaps
