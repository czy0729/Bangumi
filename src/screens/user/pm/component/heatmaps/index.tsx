/*
 * @Author: czy0729
 * @Date: 2020-12-20 17:38:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-07 22:07:01
 */
import React from 'react'
import { Heatmap } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { COMPONENT } from './ds'

function Heatmaps() {
  return (
    <>
      <Heatmap bottom={_.bottom} id='短信' screen='Say' />
      <Heatmap right={67} bottom={_.bottom} id='短信.显示评论框' transparent />
      <Heatmap right={67} bottom={_.bottom - 68} id='短信.回复短信' transparent />
    </>
  )
}

export default ob(Heatmaps, COMPONENT)
