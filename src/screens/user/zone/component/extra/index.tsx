/*
 * @Author: czy0729
 * @Date: 2024-01-16 18:30:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:28:47
 */
import React from 'react'
import { Track } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import Heatmaps from '../heatmaps'
import RemarkModal from '../remark-modal'
import UsedModal from '../used-modal'

function Extra() {
  const { $ } = useStore<Ctx>()
  return (
    <>
      <UsedModal $={$} visible={$.state.visible} defaultAvatar={$.src} />
      <RemarkModal $={$} />
      <Track
        title='空间'
        domTitle={$.nickname ? `${$.nickname}的空间` : ''}
        hm={[`user/${$.params.userId}?route=zone`, 'Zone']}
      />
      <Heatmaps />
    </>
  )
}

export default ob(Extra)
