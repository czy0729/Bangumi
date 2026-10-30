/*
 * @Author: czy0729
 * @Date: 2026-10-30 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 00:00:00
 *
 * 对话列表 hooks: 列表引用、滚动到底与行渲染
 */
import { useCallback, useEffect, useRef } from 'react'
import { useStore } from '@stores'
import Item from '../item'
import { COMPONENT, DELAY_INIT_SCROLL } from './ds'

import type { ListViewScrollMethods } from '@components'
import type { RenderItem } from '@types'
import type { SayItem } from '@stores/timeline/types'
import type { Ctx } from '../../types'

/** 列表引用与滚动到底 */
export function useListScroll() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { length } = $.say.list

  /** 首次滚底是否完成, 之后只在消息数变化时滚底 */
  const inited = useRef(false)

  /** 首次进入等列表布局完成后滚动到底部 */
  useEffect(() => {
    const timer = setTimeout(() => {
      inited.current = true
      $.scrollToBottom()
    }, DELAY_INIT_SCROLL)

    return () => {
      clearTimeout(timer)
    }
  }, [$])

  /** 消息数变化后滚动到底部 */
  useEffect(() => {
    if (!inited.current) return

    $.scrollToBottom(true)
  }, [$, length])

  const handleListViewRef = useCallback(
    (ref: ListViewScrollMethods | null) => {
      $.scrollViewRef = ref
    },
    [$]
  )

  return {
    /** 列表实例回调 */
    handleListViewRef
  }
}

/** 列表行渲染 */
export function useRenderItem() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { list } = $.say

  return useCallback(
    ({ item, index }: RenderItem<SayItem>) => (
      <Item
        item={item}
        index={index}
        showName={list[index - 1]?.name !== item.name}
        isLast={index + 1 === list.length}
      />
    ),
    [list]
  )
}
