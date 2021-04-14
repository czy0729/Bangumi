/*
 * @Author: czy0729
 * @Date: 2020-12-20 17:38:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 09:56:50
 */
import React from 'react'
import { Heatmap } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

function Heatmaps() {
  return (
    <>
      <Heatmap bottom={_.bottom} id='短信' screen='Say' />
      <Heatmap right={67} bottom={_.bottom} id='短信.显示评论框' transparent />
      <Heatmap right={67} bottom={_.bottom - 34} id='短信.新吐槽' transparent />
      <Heatmap
        right={67}
        bottom={_.bottom - 68}
        id='短信.回复短信'
        transparent
      />
    </>
  )
}

export default ob(Heatmaps)
