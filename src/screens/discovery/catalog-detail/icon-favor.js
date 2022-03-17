/*
 * @Author: czy0729
 * @Date: 2020-01-06 16:50:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-09 11:59:00
 */
import React from 'react'
import { Heatmap } from '@components'
import { IconHeader } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function IconFavor({ $ }) {
  return (
    <IconHeader
      name={$.isCollect ? 'md-star' : 'md-star-outline'}
      size={21}
      color={$.isCollect ? _.colorYellow : _.colorDesc}
      onPress={$.toggleCollect}
    >
      <Heatmap right={75} id='目录详情.取消收藏' />
      <Heatmap right={30} id='目录详情.收藏' />
    </IconHeader>
  )
}

export default obc(IconFavor)
