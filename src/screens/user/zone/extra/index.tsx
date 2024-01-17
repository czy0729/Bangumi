/*
 * @Author: czy0729
 * @Date: 2024-01-16 18:30:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-16 18:36:02
 */
import React from 'react'
import { Track } from '@components'
import { obc } from '@utils/decorators'
import Heatmaps from '../component/heatmaps'
import UsedModal from '../component/used-modal'
import { Ctx } from '../types'

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
