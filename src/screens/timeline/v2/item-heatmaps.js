/*
 * @Author: czy0729
 * @Date: 2021-01-21 20:21:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-21 20:23:30
 */
import React from 'react'
import { Heatmap } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

function ItemHeatmaps({ index }) {
  return (
    <>
      {index === 1 && (
        <Heatmap right={2} bottom={64} id='时间胶囊.删除时间线' transparent />
      )}
      {index === 2 && (
        <>
          <Heatmap
            right={_.window.contentWidth - 80}
            bottom={59}
            id='时间胶囊.跳转'
            data={{
              to: 'Zone',
              alias: '空间'
            }}
            transparent
          />
          <Heatmap
            right={2}
            bottom={26}
            id='时间胶囊.跳转'
            data={{
              to: 'Subject',
              alias: '条目'
            }}
            transparent
          />
          <Heatmap
            right={83}
            bottom={26}
            id='时间胶囊.跳转'
            data={{
              to: 'Mono',
              alias: '人物'
            }}
            transparent
          />
          <Heatmap
            right={2}
            bottom={59}
            id='时间胶囊.跳转'
            data={{
              to: 'CatalogDetail',
              alias: '目录'
            }}
            transparent
          />
          <Heatmap
            right={135}
            bottom={59}
            id='时间胶囊.跳转'
            data={{
              to: 'Group',
              alias: '小组'
            }}
            transparent
          />
          <Heatmap
            right={64}
            bottom={59}
            id='时间胶囊.跳转'
            data={{
              to: 'Topic',
              alias: '帖子'
            }}
            transparent
          />
        </>
      )}
    </>
  )
}

export default ob(ItemHeatmaps)
