/*
 * @Author: czy0729
 * @Date: 2024-03-08 05:32:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-14 08:09:44
 */
import React from 'react'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import CharactersModal from '@tinygrail/_/characters-modal'

import type { Ctx } from '../../../types'
import type { Props } from './types'

function Modal({ title, visible, onClose }: Props) {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
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
  })
}

export default Modal
