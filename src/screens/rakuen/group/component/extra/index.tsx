/*
 * @Author: czy0729
 * @Date: 2024-12-08 06:47:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-27 15:40:16
 */
import React from 'react'
import { Heatmap } from '@components'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'

function Extra() {
  r(COMPONENT)

  return useObserver(() => (
    <>
      <Heatmap id='小组' screen='Group' />
      <Heatmap right={72} bottom={_.bottom} id='小组.加入' />
      <Heatmap right={72} bottom={_.bottom - 34} id='小组.退出' />
    </>
  ))
}

export default Extra
