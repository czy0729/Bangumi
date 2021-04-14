/*
 * @Author: czy0729
 * @Date: 2020-12-16 22:53:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-21 20:34:08
 */
import React from 'react'
import { Heatmap } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

function Heatmaps() {
  return (
    <>
      <Heatmap bottom={_.bottom} id='我的' screen='User' />
    </>
  )
}

export default ob(Heatmaps)
