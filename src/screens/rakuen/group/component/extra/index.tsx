/*
 * @Author: czy0729
 * @Date: 2024-12-08 06:47:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-01 06:49:24
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap } from '@components'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'

function Extra() {
  r(COMPONENT)

  return (
    <>
      <Heatmap id='小组' screen='Group' />
      <Heatmap right={72} bottom={_.bottom} id='小组.加入' />
      <Heatmap right={72} bottom={_.bottom - 34} id='小组.退出' />
    </>
  )
}

export default observer(Extra)
