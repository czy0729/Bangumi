/*
 * @Author: czy0729
 * @Date: 2022-08-08 11:55:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-23 10:35:52
 */
import React from 'react'
import { ItemCollections } from '@_'
import { collectionStore, subjectStore, systemStore, timelineStore, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { H_HEADER, TABS } from '../../../ds'
import { COMPONENT, EVENT } from './ds'

import type { SubjectTypeCn } from '@types'
import type { Ctx } from '../../../types'
import type { Props } from './types'

function ItemList({ item, index, page }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
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

    return (
      <ItemCollections
        navigation={navigation}
        index={index}
        inViewY={H_HEADER}
        {...item}
        showManage={showManage}
        collection={collection}
        filter={filter && $.isTabActive(subjectType, key) ? filter : ''}
        hideScore={false}
        rank={rankText}
        showLabel={false}
        simpleStars
        type={typeCn}
        relatedId={timelineStore.relatedId($.username || $.userId, item.id)}
        event={EVENT}
      />
    )
  })
}

export default ItemList
