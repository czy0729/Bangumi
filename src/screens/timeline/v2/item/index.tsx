/*
 * @Author: czy0729
 * @Date: 2023-02-14 02:14:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-14 02:29:27
 */
import React from 'react'
import { ItemTimeline } from '@_'
import { _, rakuenStore } from '@stores'
import { getIsBlockUser } from '@utils'
import { obc } from '@utils/decorators'
import ItemHeatmaps from '../item-heatmaps'
import { Ctx } from '../types'

function Item({ scope, title, item, index }, { $, navigation }: Ctx) {
  const { p1 } = item
  const url = p1?.url || ''
  if (url.includes('/user/')) {
    const text = p1?.text || ''
    const { blockUserIds } = rakuenStore.setting
    if (getIsBlockUser(blockUserIds, text, url.split('/user/')?.[1])) return null
  }

  const EVENT = {
    id: '时间胶囊.跳转',
    data: {
      scope,
      title
    }
  } as const

  return (
    <>
      <ItemTimeline
        style={_.container._item}
        navigation={navigation}
        {...item}
        event={EVENT}
        onDelete={$.doDelete}
        onHidden={$.onHidden}
      />
      {index === 1 && <ItemHeatmaps />}
    </>
  )
}

export default obc(Item)
