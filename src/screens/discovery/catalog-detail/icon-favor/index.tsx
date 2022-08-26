/*
 * @Author: czy0729
 * @Date: 2020-01-06 16:50:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 15:53:28
 */
import React from 'react'
import { Heatmap } from '@components'
import { IconHeader } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

function IconFavor({ $ }: Ctx) {
  return (
    <IconHeader
      style={_.mr.xs}
      name={$.isCollect ? 'md-star' : 'md-star-outline'}
      size={22}
      color={$.isCollect ? _.colorYellow : _.colorDesc}
      onPress={$.toggleCollect}
    >
      <Heatmap right={75} id='目录详情.取消收藏' />
      <Heatmap right={30} id='目录详情.收藏' />
    </IconHeader>
  )
}

export default obc(IconFavor)
