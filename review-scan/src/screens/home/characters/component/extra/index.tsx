/*
 * @Author: czy0729
 * @Date: 2024-04-17 21:36:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-18 14:53:28
 */
import React from 'react'
import { Heatmap } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { COMPONENT } from './ds'

function Extra() {
  return <Heatmap bottom={_.bottom} id='更多角色' screen='Characters' />
}

export default ob(Extra, COMPONENT)
