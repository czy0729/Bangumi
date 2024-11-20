/*
 * @Author: czy0729
 * @Date: 2022-10-17 00:02:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 05:41:50
 */
import React from 'react'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import Item from './item'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

export default ob(({ item }) => {
  const { $, navigation } = useStore<Ctx>()
  const { subjectId } = item

  // 隐藏未匹配
  if ($.state.hideNotMatched && !subjectId) return null

  // 隐藏已看过
  const collection = $.collection(subjectId)
  if ($.state.hideWatched && collection?.status === 'collect') return null

  const totalEps = $.totalEps(subjectId)
  return (
    <Item
      navigation={navigation}
      styles={memoStyles()}
      item={item}
      collection={collection}
      totalEps={totalEps ? `${totalEps}话` : ''}
      hideSame={$.state.hideSame}
      noCommentUseCreateDate={$.state.noCommentUseCreateDate}
      scoreMinuesOne={$.state.scoreMinuesOne}
      onRefreshCollection={$.onRefreshCollection}
      onBottom={$.onBottom}
      onSubmit={$.onSubmit}
    />
  )
}, COMPONENT)
