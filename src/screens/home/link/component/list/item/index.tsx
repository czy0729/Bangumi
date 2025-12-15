/*
 * @Author: czy0729
 * @Date: 2025-12-11 01:56:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-15 19:02:06
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { ItemCollections } from '@_'
import { collectionStore, subjectStore, useStore } from '@stores'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { COMPONENT } from './ds'

import type { Ctx } from '../../../types'
import type { Props } from './types'

function Item({ item, relate }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
    <ItemCollections
      navigation={navigation}
      id={item.id}
      name={item.name}
      nameCn={item.nameCN}
      cover={subjectStore.cover(item.id)}
      tip={[item.date === '2099-12-31' ? '' : item.date, item.platform].filter(Boolean).join(' / ')}
      score={subjectStore.ratingScore(item.id)}
      rank={subjectStore.ratingRank(item.id)}
      tags={relate}
      total={subjectStore.ratingTotal(item.id)}
      simpleStars
      type={MODEL_SUBJECT_TYPE.getTitle(item.type)}
      showManage
      collection={collectionStore.collect(item.id)}
      active={item.id == $.subjectId}
    />
  ))
}

export default Item
