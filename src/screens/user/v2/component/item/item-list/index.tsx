/*
 * @Author: czy0729
 * @Date: 2022-08-08 11:55:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-24 11:12:11
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ItemCollections } from '@_'
import { collectionStore, subjectStore, systemStore, timelineStore, useStore } from '@stores'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { H_HEADER, TABS } from '../../../ds'
import { COMPONENT, EVENT } from './ds'

import type { SubjectTypeCn } from '@types'
import type { Ctx } from '../../../types'
import type { Props } from './types'

function ItemList({ item, index, page }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const { subjectType, filter } = $.state
  const { key, title } = TABS[page]
  const typeCn = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(subjectType)

  let rankText = ''
  if ($.isSortByScore) {
    const rank = subjectStore.rank(item.id)
    if (rank.s) rankText += rank.s
    if (rank.r) rankText += ` #${rank.r}`
  }

  const showManage = !$.isMe || systemStore.setting.userShowManage
  let collection = collectionStore.collect(item.id, typeCn)
  if ($.isMe && collection === title.replace('看', $.action)) collection = undefined

  const { userCommentsFull, userCommentsLines } = systemStore.setting

  return (
    <ItemCollections
      navigation={navigation}
      index={index}
      inViewY={H_HEADER}
      {...item}
      filter={filter && $.isTabActive(subjectType, key) ? filter : ''}
      rank={rankText}
      type={typeCn}
      collection={collection}
      relatedId={timelineStore.relatedId($.username || $.userId, item.id)}
      showManage={showManage}
      showLikesCreate={!$.isMe}
      hideScore={false}
      showLabel={false}
      simpleStars
      commentsFull={userCommentsFull}
      commentsLines={userCommentsLines}
      event={EVENT}
    />
  )
}

export default observer(ItemList)
