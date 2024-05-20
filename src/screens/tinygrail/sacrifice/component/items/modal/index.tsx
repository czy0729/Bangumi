/*
 * @Author: czy0729
 * @Date: 2024-03-08 05:32:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-19 11:52:51
 */
import React from 'react'
import { obc } from '@utils/decorators'
import CharactersModal from '@tinygrail/_/characters-modal'
import { Fn } from '@types'
import { Ctx } from '../../../types'

function Modal(
  {
    title,
    visible,
    onClose
  }: {
    title: string
    visible: boolean
    onClose: Fn
  },
  { $ }: Ctx
) {
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

  const props: {
    leftItem?: typeof item
    rightItem?: typeof item
  } = {}
  if (['虚空道标', '闪光结晶', '鲤鱼之眼'].includes(title)) {
    props.leftItem = item
  } else {
    props.rightItem = item
  }

  return (
    <CharactersModal
      title={title}
      visible={visible}
      onClose={onClose}
      onSubmit={$.doUse}
      {...props}
    />
  )
}

export default obc(Modal)
