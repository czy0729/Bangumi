/*
 * @Author: czy0729
 * @Date: 2020-12-16 22:53:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 06:02:51
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap } from '@components'
import { _ } from '@stores'

function Heatmaps() {
  return <Heatmap bottom={_.bottom} id='我的' screen='User' />
}

export default observer(Heatmaps)
