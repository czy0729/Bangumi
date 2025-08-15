/*
 * @Author: czy0729
 * @Date: 2024-01-04 16:44:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 16:49:35
 */
import React from 'react'
import { Track } from '@components'
import { ob } from '@utils/decorators'
import Heatmaps from '../heatmaps'
import { COMPONENT } from './ds'

function Extra() {
  return (
    <>
      <Track title='时间胶囊' hm={['timeline', 'Timeline']} />
      <Heatmaps />
    </>
  )
}

export default ob(Extra, COMPONENT)
