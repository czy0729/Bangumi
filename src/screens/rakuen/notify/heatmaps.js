/*
 * @Author: czy0729
 * @Date: 2020-12-19 17:21:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-26 21:04:48
 */
import React from 'react'
import { Heatmap } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

function Heatmaps() {
  return (
    <>
      <Heatmap
        right={86}
        bottom={_.bottom + 20}
        id='电波提醒.跳转'
        data={{
          to: 'Topic',
          alias: '帖子'
        }}
        transparent
      />
      <Heatmap
        right={86}
        bottom={_.bottom - 13}
        id='电波提醒.跳转'
        data={{
          to: 'PM'
        }}
        transparent
      />
      <Heatmap
        right={260}
        bottom={_.bottom - 13}
        id='电波提醒.跳转'
        data={{
          to: 'Zone',
          alias: '空间'
        }}
        transparent
      />
      <Heatmap
        right={86}
        bottom={_.bottom - 46}
        id='电波提醒.跳转'
        data={{
          to: 'Blog',
          alias: '日志'
        }}
        transparent
      />
    </>
  )
}

export default ob(Heatmaps)
