/*
 * @Author: czy0729
 * @Date: 2023-12-31 11:12:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-01 11:43:39
 */
import React from 'react'
import { Track } from '@components'
import { obc } from '@utils/decorators'
import Heatmaps from '../component/heatmaps'
import { COMPONENT } from './ds'

function Extra(props, { $ }) {
  return (
    <>
      <Track title='时光机' hm={[`user/${$.myUserId}?route=user`, 'User']} />
      <Heatmaps />
    </>
  )
}

export default obc(Extra, COMPONENT)
