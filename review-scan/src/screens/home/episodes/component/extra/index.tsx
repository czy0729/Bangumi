/*
 * @Author: czy0729
 * @Date: 2024-04-18 15:50:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-18 15:51:13
 */
import React from 'react'
import { Heatmap } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { COMPONENT } from './ds'

function Extra() {
  return <Heatmap bottom={_.bottom} id='章节' screen='Episodes' />
}

export default ob(Extra, COMPONENT)
