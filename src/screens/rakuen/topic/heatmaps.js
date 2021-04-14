/*
 * @Author: czy0729
 * @Date: 2020-12-16 00:58:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-20 15:35:40
 */
import React from 'react'
import { Heatmap } from '@components'
import { ob } from '@utils/decorators'

function Heatmaps() {
  return (
    <>
      <Heatmap right={2} bottom={160} id='帖子.楼层跳转' transparent />
      <Heatmap right={76} bottom={84} id='帖子.删除回复' transparent />
      <Heatmap right={76} bottom={51} id='帖子.回复' transparent />
      <Heatmap right={119} bottom={51} id='帖子.回复失败' transparent />
      <Heatmap right={76} bottom={18} id='帖子.显示评论框' transparent />
      <Heatmap id='帖子' screen='Topic' />
    </>
  )
}

export default ob(Heatmaps)
