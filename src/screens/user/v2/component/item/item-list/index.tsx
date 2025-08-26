/*
 * @Author: czy0729
 * @Date: 2022-08-08 11:55:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-26 02:39:31
 */
import React from 'react'
import { ItemCollections } from '@_'
import { collectionStore, subjectStore, systemStore, timelineStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { H_HEADER, TABS } from '../../../ds'
import { Ctx } from '../../../types'
import { COMPONENT, EVENT } from './ds'

function ItemList({ item, index, page }) {
  const { $, navigation } = useStore<Ctx>()
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
      collection={!$.isMe ? collectionStore.collect(item.id) : undefined}
      filter={activeFilter}
      hideScore={false}
      rank={rankText}
      showLabel={false}
      showManage={systemStore.setting.userShowManage || !$.isMe}
      simpleStars
      type={typeCn}
      relatedId={timelineStore.relatedId($.username || $.userId, item.id)}
      event={EVENT}
      onManagePress={$.onManagePress}
    />
  )
}

export default ob(ItemList, COMPONENT)
