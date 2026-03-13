/*
 * @Author: czy0729
 * @Date: 2023-02-14 02:14:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-18 17:26:54
 */
import React from 'react'
import { ItemTimeline, SectionHeader } from '@_'
import { _, rakuenStore, useStore } from '@stores'
import { TimelineItem } from '@stores/timeline/types'
import { getIsBlockedUser } from '@utils'
import { ob } from '@utils/decorators'
import { MODEL_TIMELINE_SCOPE } from '@constants'
import { Ctx, TabLabel } from '../../types'
import ItemHeatmaps from '../item-heatmaps'
import { COMPONENT } from './ds'

function Item({ title, item, index }: { title: TabLabel; item: TimelineItem; index: number }) {
  const { $, navigation } = useStore<Ctx>()
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
  return (
    <>
      {!!item.date && <SectionHeader>{item.date}</SectionHeader>}
      <ItemTimeline
        style={_.container.item}
        navigation={navigation}
        {...item}
        full={MODEL_TIMELINE_SCOPE.getLabel(scope) === '自己'}
        index={index}
        event={{
          id: '时间胶囊.跳转',
          data: {
            scope,
            title
          }
        }}
        onDelete={$.doDelete}
        onHidden={$.onHidden}
      />
      {index === 1 && <ItemHeatmaps />}
    </>
  )
}

export default ob(Item, COMPONENT)
