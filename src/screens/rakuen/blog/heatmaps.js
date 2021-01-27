/*
 * @Author: czy0729
 * @Date: 2020-12-19 16:56:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-26 21:00:43
 */
import React from 'react'
import { Heatmap } from '@components'
import { ob } from '@utils/decorators'

function Heatmaps() {
  return (
    <>
      <Heatmap right={2} bottom={160} id='日志.楼层跳转' transparent />
      <Heatmap right={76} bottom={84} id='日志.删除回复' transparent />
      <Heatmap right={76} bottom={51} id='日志.回复' transparent />
      <Heatmap right={119} bottom={51} id='日志.回复失败' transparent />
      <Heatmap right={76} bottom={18} id='日志.显示评论框' transparent />
      <Heatmap id='日志' screen='Blog' />
    </>
  )
}

export default ob(Heatmaps)
