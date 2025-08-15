/*
 * @Author: czy0729
 * @Date: 2024-04-05 04:52:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-05 04:53:29
 */
import React from 'react'
import { Heatmap } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { COMPONENT } from './ds'

function Extra() {
  return (
    <Heatmap
      right={_.wind}
      bottom={_.window.height - _.tabsHeaderHeight - 12}
      id='标签索引.标签页切换'
      transparent
    />
  )
}

export default ob(Extra, COMPONENT)
