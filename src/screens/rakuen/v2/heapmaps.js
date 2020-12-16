/*
 * @Author: czy0729
 * @Date: 2020-12-16 01:24:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-16 18:11:05
 */
import React from 'react'
import { Heatmap } from '@components'
import { _ } from '@stores'
import { observer } from '@utils/decorators'

function Heatmaps() {
  return (
    <>
      <Heatmap
        right={_.wind + 62}
        bottom={_.window.height - _.tabsHeaderHeight - 12}
        id='超展开.标签页切换'
        transparent
      />
      <Heatmap
        right={_.wind}
        bottom={_.window.height - _.tabsHeaderHeight - 12}
        id='超展开.标签页点击'
        transparent
      />
      <Heatmap bottom={_.bottom} id='超展开' screen='Rakuen' />
    </>
  )
}

export default observer(Heatmaps)
