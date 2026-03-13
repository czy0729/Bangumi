/*
 * @Author: czy0729
 * @Date: 2024-12-08 06:47:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-08 06:48:32
 */
import React from 'react'
import { Heatmap } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { COMPONENT } from './ds'

function Extra() {
  return (
    <>
      <Heatmap id='小组' screen='Group' />
      <Heatmap right={72} bottom={_.bottom} id='小组.加入' />
      <Heatmap right={72} bottom={_.bottom - 34} id='小组.退出' />
    </>
  )
}

export default ob(Extra, COMPONENT)
