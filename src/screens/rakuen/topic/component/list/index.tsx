/*
 * @Author: czy0729
 * @Date: 2021-11-26 03:14:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-16 21:55:02
 */
import React, { useCallback, useRef, useState } from 'react'
import { FixedBtn } from '@_'
import { useStore } from '@stores'
import { feedback } from '@utils'
import { useFocusEffect, useObserver } from '@utils/hooks'
import List from './list'
import { COMPONENT } from './ds'

import type { HandleViewableItemsChanged, Props } from './types'
import type { Ctx } from '../../types'

function ListWrap({ forwardRef, onScrollTo, onShowFixedTextarea, onScrollToIndexFailed }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  /** 当前可见的楼层 id（state 只用于渲染控制） */
  const [viewableItem, setViewableItem] = useState<string>('')

  /** 当前楼层 index（不影响渲染） */
  const viewableIndexRef = useRef<number>(0)

  /** 可见项变化时的处理逻辑 */
  const handleViewableItemsChanged = useCallback<HandleViewableItemsChanged>(
    ({ viewableItems }) => {
      if (!viewableItems?.length) return

      // 取第一个最靠前的 item
      const firstItem = viewableItems[0]
      const id = String(firstItem?.item?.id || '')

      // 避免无意义的重复 setState
      setViewableItem(prev => {
        if (prev === id) return prev
        viewableIndexRef.current = firstItem.index
        return id
      })
    },
    []
  )

  /** 折叠逻辑 */
  const handleToggle = useCallback(() => {
    const id = viewableItem
    if (!id) return

    const prevIndex = viewableIndexRef.current
    $.toggleExpand(id)

    requestAnimationFrame(() => {
      onScrollTo(prevIndex, false, false, 88)
      feedback(true)
    })
  }, [$, onScrollTo, viewableItem])

  // 失去焦点时隐藏按钮 (比如进入了某个用户空间)
  useFocusEffect(
    useCallback(() => {
      return () => setViewableItem('')
    }, [])
  )

  return useObserver(() => {
    const { expands } = $.state
    const isExpanded = expands.includes(viewableItem)

    return (
      <>
        <List
          forwardRef={forwardRef}
          data={$.comments}
          postId={$.postId}
          onViewableItemsChanged={handleViewableItemsChanged}
          onScroll={$.onScroll}
          onScrollToIndexFailed={onScrollToIndexFailed}
          onHeaderRefresh={$.fetchTopic}
          onShowFixedTextarea={onShowFixedTextarea}
        />
        {isExpanded && <FixedBtn onPress={handleToggle}>收起楼层</FixedBtn>}
      </>
    )
  })
}

export default ListWrap
