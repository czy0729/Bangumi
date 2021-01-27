/*
 * @Author: czy0729
 * @Date: 2020-01-06 16:50:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-26 20:36:34
 */
import React from 'react'
import { Heatmap } from '@components'
import { IconHeader } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function IconFavor({ $ }) {
  return (
    <IconHeader
      name={$.isCollect ? 'star-full' : 'star'}
      color={$.isCollect ? _.colorYellow : _.colorDesc}
      onPress={$.toggleCollect}
    >
      <Heatmap right={75} id='目录详情.取消收藏' />
      <Heatmap right={30} id='目录详情.收藏' />
    </IconHeader>
  )
}

export default obc(IconFavor)
