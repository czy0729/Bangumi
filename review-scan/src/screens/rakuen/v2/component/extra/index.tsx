/*
 * @Author: czy0729
 * @Date: 2024-01-04 17:45:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 17:46:30
 */
import React from 'react'
import { Track } from '@components'
import { ob } from '@utils/decorators'
import Heatmaps from '../heapmaps'
import { COMPONENT } from './ds'

function Extra() {
  return (
    <>
      <Track title='超展开' hm={['rakuen', 'Rakuen']} />
      <Heatmaps />
    </>
  )
}

export default ob(Extra, COMPONENT)
