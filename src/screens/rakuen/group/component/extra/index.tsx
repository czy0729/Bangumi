/*
 * @Author: czy0729
 * @Date: 2024-12-08 06:47:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-24 10:00:00
 *
 * 调试面板: 埋点热区
 */
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
