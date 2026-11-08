/*
 * @Author: czy0729
 * @Date: 2022-10-17 00:02:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-07 19:30:00
 *
 * 条目外层: 读 store 守卫显隐与数据
 */
import { observer } from 'mobx-react'
import { useStore } from '@stores'
import Item from './item'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { RenderItem } from '@types'
import type { Ctx, DoubanItem } from '../../types'

function ItemWrap({ item }: RenderItem<DoubanItem>) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const { subjectId } = item

  // 隐藏未匹配
  if ($.state.hideNotMatched && !subjectId) return null

  // 隐藏已看过
  const collection = $.collection(subjectId)
  if ($.state.hideWatched && collection?.status === 'collect') return null

  const totalEps = $.totalEps(subjectId)
  const styles = memoStyles()

  return (
    <Item
      navigation={navigation}
      styles={styles}
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
}

export default observer(ItemWrap)
