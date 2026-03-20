/*
 * @Author: czy0729
 * @Date: 2024-01-20 06:09:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 07:36:59
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap } from '@components'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'

function Heatmaps() {
  r(COMPONENT)

  return (
    <>
      <Heatmap bottom={68} id='首页.全部展开' transparent />
      <Heatmap bottom={34} id='首页.全部关闭' transparent />
      <Heatmap id='首页.跳转' to='Subject' alias='条目' />
    </>
  )
}

export default observer(Heatmaps)
