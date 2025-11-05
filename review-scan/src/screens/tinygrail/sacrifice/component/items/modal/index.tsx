/*
 * @Author: czy0729
 * @Date: 2024-03-08 05:32:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-02 22:49:22
 */
import React from 'react'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import CharactersModal from '@tinygrail/_/characters-modal'
import { Fn } from '@types'
import { Ctx } from '../../../types'

function Modal({ title, visible, onClose }: { title: string; visible: boolean; onClose: Fn }) {
  const { $ } = useStore<Ctx>()
  const item = {
    assets: $.myTemple.assets || 0,
    icon: $.icon,
    id: $.id,
    level: $.level,
    name: $.name,
    rank: $.rank,
    rate: $.rate,
    sacrifices: $.userLogs.sacrifices || 0
  }

  const passProps: {
    leftItem?: typeof item
    rightItem?: typeof item
  } = {}
  if (['虚空道标', '闪光结晶', '鲤鱼之眼'].includes(title)) {
    passProps.leftItem = item
  } else {
    passProps.rightItem = item
  }

  return (
    <CharactersModal
      title={title}
      visible={visible}
      onClose={onClose}
      onSubmit={$.doUse}
      {...passProps}
    />
  )
}

export default ob(Modal)
