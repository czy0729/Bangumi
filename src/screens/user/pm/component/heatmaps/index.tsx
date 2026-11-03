/*
 * @Author: czy0729
 * @Date: 2020-12-20 17:38:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-03 06:39:21
 *
 * 埋点热区
 */
import { observer } from 'mobx-react'
import { Heatmap } from '@components'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'

function Heatmaps() {
  r(COMPONENT)

  return (
    <>
      <Heatmap bottom={_.bottom} id='短信' screen='Say' />
      <Heatmap right={67} bottom={_.bottom} id='短信.显示评论框' transparent />
      <Heatmap right={67} bottom={_.bottom - 68} id='短信.回复短信' transparent />
    </>
  )
}

export default observer(Heatmaps)
