/*
 * @Author: czy0729
 * @Date: 2024-01-16 18:30:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-24 23:46:18
 */
import React from 'react'
import { Track } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import Heatmaps from '../heatmaps'
import UsedModal from '../used-modal'

function Extra(props, { $ }: Ctx) {
  return (
    <>
      <UsedModal visible={$.state.visible} defaultAvatar={$.src} />
      <Track title='空间' hm={[`user/${$.params.userId}?route=zone`, 'Zone']} />
      <Heatmaps />
    </>
  )
}

export default obc(Extra)
