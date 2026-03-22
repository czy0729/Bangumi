/*
 * @Author: czy0729
 * @Date: 2020-12-20 19:47:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 06:41:19
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap } from '@components'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'

function Heatmaps() {
  r(COMPONENT)

  return (
    <>
      <Heatmap
        right={_.wind + 62}
        bottom={_.window.height / 1.6}
        id='空间.标签页切换'
        transparent
      />
      <Heatmap right={_.wind} bottom={_.window.height / 1.6} id='空间.标签页点击' transparent />
      <Heatmap bottom={_.bottom} id='空间' screen='Zone' />
    </>
  )
}

export default observer(Heatmaps)
