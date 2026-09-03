/*
 * @Author: czy0729
 * @Date: 2024-04-17 21:36:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-18 14:53:28
 *
 * 更多角色页底部埋点组件
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap } from '@components'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'

function Extra() {
  r(COMPONENT)

  return <Heatmap bottom={_.bottom} id='更多角色' screen='Characters' />
}

export default observer(Extra)
