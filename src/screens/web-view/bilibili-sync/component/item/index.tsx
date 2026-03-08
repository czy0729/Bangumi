/*
 * @Author: czy0729
 * @Date: 2022-04-24 15:29:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 05:37:28
 */
import React from 'react'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import Item from './item'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { RenderItem } from '@types'
import type { BilibiliItem, Ctx } from '../../types'

function ItemWrap({ item }: RenderItem<BilibiliItem>) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const { subjectId } = item

    // 隐藏未匹配
    if ($.state.hideNotMatched && !subjectId) return null

    // 隐藏已看过
    const collection = $.collection(subjectId)
    if ($.state.hideWatched && collection?.status === 'collect') return null

    return (
      <Item
        navigation={navigation}
        styles={memoStyles()}
        item={item}
        review={$.review(item.id)}
        collection={collection}
        hideSame={$.state.hideSame}
        onRefreshCollection={$.onRefreshCollection}
        onBottom={$.onBottom}
        onSubmit={$.onSubmit}
      />
    )
  })
}

export default ItemWrap
