/*
 * @Author: czy0729
 * @Date: 2022-01-06 07:42:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-09 03:52:10
 */
import React from 'react'
import { Heatmap } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { COMPONENT } from './ds'

function Heatmaps() {
  return (
    <>
      <Heatmap
        right={_.wind + 62}
        bottom={_.window.height - _.tabsHeaderHeight - 12}
        id='全站日志.标签页切换'
        transparent
      />
      <Heatmap
        right={_.wind}
        bottom={_.window.height - _.tabsHeaderHeight - 12}
        id='全站日志.标签页点击'
        transparent
      />
    </>
  )
}

export default ob(Heatmaps, COMPONENT)
