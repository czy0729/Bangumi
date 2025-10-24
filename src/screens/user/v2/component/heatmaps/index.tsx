/*
 * @Author: czy0729
 * @Date: 2020-12-16 22:53:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-23 10:32:20
 */
import React from 'react'
import { Heatmap } from '@components'
import { _ } from '@stores'
import { useObserver } from '@utils/hooks'

function Heatmaps() {
  return useObserver(() => <Heatmap bottom={_.bottom} id='我的' screen='User' />)
}

export default Heatmaps
