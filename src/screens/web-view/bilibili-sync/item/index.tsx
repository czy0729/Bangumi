/*
 * @Author: czy0729
 * @Date: 2022-04-24 15:29:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-29 19:20:54
 */
import React from 'react'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import Item from './item'
import { memoStyles } from './styles'

export default obc(({ item }, { $, navigation }: Ctx) => {
  const { hideWatched, hideSame, hideNotMatched } = $.state
  const { subjectId } = item

  // 隐藏未匹配
  if (hideNotMatched && !subjectId) return null

  // 隐藏已看过
  const collection = $.collection(subjectId)
  if (hideWatched && collection?.status === 'collect') return null

  return (
    <Item
      navigation={navigation}
      styles={memoStyles()}
      item={item}
      review={$.review(item.id)}
      collection={collection}
      hideSame={hideSame}
      onRefreshCollection={$.onRefreshCollection}
      onBottom={$.onBottom}
      onSubmit={$.onSubmit}
    />
  )
})
