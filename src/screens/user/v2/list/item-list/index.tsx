/*
 * @Author: czy0729
 * @Date: 2022-08-08 11:55:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-19 20:34:20
 */
import React from 'react'
import { ItemCollections } from '@_'
import { collectionStore, subjectStore } from '@stores'
import { obc } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { H_HEADER, TABS } from '../../ds'
import { Ctx } from '../../types'

const EVENT = {
  id: '我的.跳转',
  type: 'list'
} as const

function ItemList({ item, index, page }, { $, navigation }: Ctx) {
  const { subjectType } = $.state
  const { key: type } = TABS[page]
  const typeCn = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(subjectType)
  const filter = $.isTabActive(subjectType, type) ? $.state.filter : ''

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
      userCollection={$.label}
      isDo={type === 'do'}
      isDropped={type === 'dropped'}
      isOnHold={type === 'on_hold'}
      event={EVENT}
      filter={filter}
      simpleStars
      rank={rankText}
      collection={!$.isMe ? collectionStore.collect(item.id) : undefined}
      onManagePress={$.onManagePress}
    />
  )
}

export default obc(ItemList)
