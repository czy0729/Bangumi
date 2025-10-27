/*
 * @Author: czy0729
 * @Date: 2021-01-21 20:21:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 16:54:49
 */
import React from 'react'
import { Heatmap } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { COMPONENT } from './ds'

function ItemHeatmaps() {
  return (
    <>
      <Heatmap right={2} bottom={64} id='时间胶囊.删除时间线' transparent />
      <Heatmap
        right={_.window.contentWidth - 80}
        bottom={59}
        id='时间胶囊.跳转'
        to='Zone'
        alias='空间'
        transparent
      />
      <Heatmap right={2} bottom={26} id='时间胶囊.跳转' to='Subject' alias='条目' transparent />
      <Heatmap right={83} bottom={26} id='时间胶囊.跳转' to='Mono' alias='人物' transparent />
      <Heatmap
        right={2}
        bottom={59}
        id='时间胶囊.跳转'
        to='CatalogDetail'
        alias='目录'
        transparent
      />
      <Heatmap right={135} bottom={59} id='时间胶囊.跳转' to='Group' alias='小组' transparent />
      <Heatmap right={64} bottom={59} id='时间胶囊.跳转' to='Topic' alias='帖子' transparent />
    </>
  )
}

export default ob(ItemHeatmaps, COMPONENT)
