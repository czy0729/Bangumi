/*
 * @Author: czy0729
 * @Date: 2023-12-31 11:12:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-23 00:35:52
 */
import React from 'react'
import { Track } from '@components'
import { obc } from '@utils/decorators'
import Heatmaps from '../heatmaps'
import { COMPONENT } from './ds'

function Extra(_props, { $ }) {
  return (
    <>
      <Track title='时光机' hm={[`user/${$.myUserId}?route=user`, 'User']} />
      <Heatmaps />
    </>
  )
}

export default obc(Extra, COMPONENT)
