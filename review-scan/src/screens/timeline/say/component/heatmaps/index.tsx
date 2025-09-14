/*
 * @Author: czy0729
 * @Date: 2020-12-20 03:15:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-15 22:15:19
 */
import React from 'react'
import { Heatmap } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { COMPONENT } from './ds'

function Heatmaps() {
  return (
    <>
      <Heatmap bottom={_.bottom} id='吐槽' screen='Say' />
      <Heatmap right={67} bottom={_.bottom} id='吐槽.显示评论框' transparent />
      <Heatmap right={67} bottom={_.bottom - 34} id='吐槽.新吐槽' transparent />
      <Heatmap right={67} bottom={_.bottom - 68} id='吐槽.回复吐槽' transparent />
      <Heatmap right={121} bottom={_.bottom - 68} id='吐槽.回复失败' transparent />
    </>
  )
}

export default ob(Heatmaps, COMPONENT)
