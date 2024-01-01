/*
 * @Author: czy0729
 * @Date: 2022-08-08 11:55:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-01 16:22:00
 */
import React from 'react'
import { ItemCollections } from '@_'
import { collectionStore, subjectStore } from '@stores'
import { obc } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { H_HEADER, TABS } from '../../../ds'
import { Ctx } from '../../../types'
import { COMPONENT, EVENT } from './ds'

function ItemList({ item, index, page }, { $, navigation }: Ctx) {
  const { subjectType, filter } = $.state
  const { key: type } = TABS[page]
  const typeCn = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(subjectType)
  const activeFilter = filter && $.isTabActive(subjectType, type) ? filter : ''

  let rankText = ''
  if ($.isSortByScore) {
    const rank = subjectStore.rank(item.id)
    if (rank.s) rankText += rank.s
    if (rank.r) rankText += ` #${rank.r}`
  }

  return (
    <ItemCollections
      navigation={navigation}
      index={index}
      inViewY={H_HEADER}
      {...item}
      showLabel={false}
      type={typeCn}
      isDo={type === 'do'}
      isDropped={type === 'dropped'}
      isOnHold={type === 'on_hold'}
      event={EVENT}
      filter={activeFilter}
      simpleStars
      rank={rankText}
      collection={!$.isMe ? collectionStore.collect(item.id) : undefined}
      onManagePress={$.onManagePress}
    />
  )
}

export default obc(ItemList, COMPONENT)
