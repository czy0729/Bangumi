/*
 * @Author: czy0729
 * @Date: 2026-10-24 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-24 10:00:00
 *
 * 日志列表 hooks: 楼层跳转与列表项渲染
 */
import { useCallback, useEffect, useRef } from 'react'
import { ItemPost } from '@_'
import { useStore } from '@stores'
import { info, postTask } from '@utils'
import { logger } from '@utils/dev'
import { t } from '@utils/fetch'
import { HEADER_HEIGHT } from '@styles'
import { COMPONENT } from './ds'

import type { FixedTextareaInstance, ListViewInstance } from '@components'
import type { EventType, TimerRef } from '@types'
import type { HandleRenderItem, HandleScrollToIndexFailed } from './types'
import type { Ctx } from '../../types'

/** 列表滚动: 引用、楼层跳转与失败重试 */
export function useListScroll() {
  const { $ } = useStore<Ctx>(COMPONENT)

  /** 长列表引用 */
  const listView = useRef<ListViewInstance | null>(null)

  /** 尝试滚动失败次数 */
  const scrollFailCount = useRef(0)

  /** 挂载初始化只执行一次 */
  const inited = useRef(false)

  /** 滚动重试定时器 */
  const scrollTimer = useRef<TimerRef>(null)

  /** 滚动到指定楼层 */
  const handleScrollTo = useCallback(
    (index = 0) => {
      const { list } = $.comments
      if (!list[index]) return

      info(list[index].floor, 0.8)

      try {
        listView.current?.scrollToIndex({
          animated: false,
          index,
          viewOffset: 0
        })
      } catch (error) {
        logger.error('blog/index.js', 'scrollTo', error)
      }
    },
    [$]
  )

  /** 跳转到提醒指定楼层 */
  const handleJumpTo = useCallback(() => {
    if (!$.postId) return

    const { list, _loaded } = $.comments
    if (!_loaded) return

    try {
      let scrollIndex = -1
      list.forEach((item, index) => {
        if (scrollIndex > -1) return

        if (item.id === $.postId) {
          scrollIndex = index
        } else if (item.sub) {
          item.sub.forEach(i => {
            if (i.id === $.postId) {
              scrollIndex = index
            }
          })
        }
      })

      if (scrollIndex > -1) handleScrollTo(scrollIndex)
    } catch (error) {
      logger.error('blog/index.js', 'jump', error)
    }
  }, [$, handleScrollTo])

  /** 楼层进度条点击 */
  const handleScrollToThenFeedback = useCallback(
    (index = 0) => {
      t('日志.楼层跳转', {
        blogId: $.blogId,
        index
      })

      if (index === -1) {
        info('#0', 0.8)
        listView.current?.scrollToOffset({
          animated: true,
          offset: 0 - HEADER_HEIGHT
        })
        return
      }

      const { list } = $.comments
      if (!list[index]) return

      info(list[index].floor, 0.8)

      try {
        listView.current?.scrollToIndex({
          animated: true,
          index,
          viewOffset: 0 + HEADER_HEIGHT
        })
      } catch (error) {
        logger.error('blog/index.js', 'scrollToThenFeedback', error)
      }
    },
    [$]
  )

  /** 滚动失败后进行保守重试 */
  const handleScrollToIndexFailed = useCallback<HandleScrollToIndexFailed>(
    ({ highestMeasuredFrameIndex, index }) => {
      handleScrollTo(highestMeasuredFrameIndex)
      scrollTimer.current = setTimeout(() => {
        if (scrollFailCount.current > 10) return
        scrollFailCount.current += 1
        handleScrollTo(index)
      }, 100)
    },
    [handleScrollTo]
  )

  const handleListViewRef = useCallback((ref: ListViewInstance | null) => {
    listView.current = ref
  }, [])

  useEffect(() => {
    if (inited.current) return

    inited.current = true
    postTask(async () => {
      await $.init()

      if ($.postId) handleJumpTo()
    })

    return () => {
      if (scrollTimer.current) clearTimeout(scrollTimer.current)
    }
  }, [$, handleJumpTo])

  return {
    handleListViewRef,
    handleScrollToThenFeedback,
    handleScrollToIndexFailed
  }
}

/** 列表项渲染与底部评论框 */
export function useListElements() {
  const { $ } = useStore<Ctx>(COMPONENT)

  /** 底部回复框引用 */
  const fixedTextareaRef = useRef<FixedTextareaInstance | null>(null)

  /** 显示评论框 */
  const handleShowFixedTextarea = useCallback(() => {
    fixedTextareaRef.current?.onFocus()
  }, [])

  const renderItem = useCallback<HandleRenderItem>(
    ({ item, index }) => {
      const event: EventType = {
        id: '日志.跳转',
        data: {
          blogId: $.blogId
        }
      }
      return (
        <ItemPost
          index={index}
          postId={$.postId}
          authorId={$.blog.userId}
          {...item}
          showFixedTextarea={handleShowFixedTextarea}
          event={event}
        />
      )
    },
    [$, handleShowFixedTextarea]
  )

  return {
    fixedTextareaRef,
    renderItem
  }
}
