/*
 * @Author: czy0729
 * @Date: 2020-12-16 22:53:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-09 12:50:36
 */
import React from 'react'
import { Heatmap } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

function Heatmaps() {
  return <Heatmap bottom={_.bottom} id='我的' screen='User' />
}

export default ob(Heatmaps)
