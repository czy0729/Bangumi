/*
 * @Author: czy0729
 * @Date: 2023-02-14 02:14:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-31 14:32:46
 */
import React from 'react'
import { ItemTimeline, SectionHeader } from '@_'
import { _, rakuenStore, useStore } from '@stores'
import { getIsBlockedUser } from '@utils'
import { useObserver } from '@utils/hooks'
import { MODEL_TIMELINE_SCOPE } from '@constants'
import ItemHeatmaps from '../item-heatmaps'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'
import type { Props } from './types'

function Item({ title, item, index }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const { p1 } = item
    const url = p1?.url || ''
    if (url.includes('/user/')) {
      const text = p1?.text || ''
      if (
        getIsBlockedUser(
          rakuenStore.blockUserIds,
          text,
          url.split('/user/')?.[1],
          `Timeline|${index}`
        )
      ) {
        return null
      }
    }

    const { scope } = $.state
    const event = {
      id: '时间胶囊.跳转',
      data: {
        scope,
        title
      }
    } as const

    return (
      <>
        {!!item.date && <SectionHeader>{item.date}</SectionHeader>}
        <ItemTimeline
          style={_.container.item}
          navigation={navigation}
          {...item}
          full={MODEL_TIMELINE_SCOPE.getLabel(scope) === '自己'}
          index={index}
          event={event}
          onDelete={$.doDelete}
          onHidden={$.onHidden}
        />
        {index === 1 && <ItemHeatmaps />}
      </>
    )
  })
}

export default Item
