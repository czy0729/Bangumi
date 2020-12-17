/*
 * @Author: czy0729
 * @Date: 2020-04-21 10:22:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-15 22:59:28
 */
import React from 'react'
import { Heatmap } from '@components'
import { _ } from '@stores'
import { observer } from '@utils/decorators'

function Heatmaps() {
  return (
    <>
      <Heatmap
        right={_.wind + 62}
        bottom={_.window.height - _.tabsHeaderHeight - 12}
        id='首页.标签页切换'
        transparent
      />
      <Heatmap
        right={_.wind}
        bottom={_.window.height - _.tabsHeaderHeight - 12}
        id='首页.标签页点击'
        transparent
      />
      <Heatmap
        right={_.wind + 154}
        bottom={_.bottom + 16}
        id='首页.管理收藏'
        transparent
      />
      <Heatmap
        right={_.wind + 288}
        bottom={_.bottom + 16}
        id='其他.启动'
        transparent
      />
      <Heatmap
        right={_.wind + 297}
        bottom={_.bottom + 50}
        id='其他.Linking'
        transparent
      />
      <Heatmap
        right={_.wind + 62}
        bottom={_.bottom + 16}
        id='首页.格子布局条目选择'
        transparent
      />
      <Heatmap bottom={_.bottom} id='首页' screen='Home' />
    </>
  )
}

export default observer(Heatmaps)
