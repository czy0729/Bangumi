/*
 * @Author: czy0729
 * @Date: 2019-04-29 19:28:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-14 13:25:06
 */
import React, { useState, useRef, useCallback, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { Page, Loading } from '@components'
import { useOnScroll } from '@components/header/utils'
import { ItemPost, TapListener } from '@_'
import { _, uiStore } from '@stores'
import { info, androidKeyboardAdjust } from '@utils'
import { ic } from '@utils/decorators'
import {
  useObserver,
  useIsFocused as useIsFocusedRef,
  useRunAfter,
  useKeyboardAdjustResize
} from '@utils/hooks'
import { t } from '@utils/fetch'
import Header from './header'
import List from './list'
import TouchScroll from './touch-scroll'
import Heatmaps from './heatmaps'
import Bottom from './bottom'
import Store from './store'

const PRE_RENDER_INDEX = 8

const Topic = (props, { $ }) => {
  const isFocused = useIsFocused()
  const isFocusedRef = useIsFocusedRef()
  const { fixed, onScroll } = useOnScroll()
  const [rendered, setRendered] = useState(false)
  const forwardRef = useRef(null)
  const fixedTextareaRef = useRef(null)
  const scrollFailCount = useRef(0)

  const scrollTo = useCallback((index = 0) => {
    const { list } = $.comments
    info(list[index]?.floor, 0.8)

    try {
      forwardRef.current?.scrollToIndex({
        animated: false,
        index,
        viewOffset: 0
      })
    } catch (error) {
      console.error('topic/index.js', 'scrollTo', error)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const onScrollFn = useCallback(
    e => {
      uiStore.closePopableSubject()
      onScroll(e)
    },
    [onScroll]
  )
  const onScrollTo = useCallback((index = 0) => {
    t('帖子.楼层跳转', {
      topicId: $.topicId,
      index
    })

    if (index === -1) {
      info('#1', 0.8)
      forwardRef.current?.scrollToOffset({
        animated: true,
        offset: 0 - _.headerHeight
      })
      return
    }

    const { list } = $.comments
    info(list[index]?.floor, 0.8)

    try {
      forwardRef.current?.scrollToIndex({
        animated: true,
        index,
        viewOffset: 0 + _.headerHeight
      })
    } catch (error) {
      console.error('topic/index.js', 'onScrollTo', error)

      // 使用了分页 PaginationList 的情况下, 只能先去到最底层
      try {
        const str = String(error)
        const maximum = str.match(/but maximum is (\d+)/)?.[1]
        if (maximum) {
          info(`#${maximum}`, 0.8)
          forwardRef.current?.scrollToIndex({
            animated: true,
            index: Number(maximum),
            viewOffset: 0 + _.headerHeight
          })
        }
        // eslint-disable-next-line no-catch-shadow
      } catch (error) {}
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const onScrollToIndexFailed = useCallback(
    ({ highestMeasuredFrameIndex, index }) => {
      scrollTo(highestMeasuredFrameIndex)

      setTimeout(() => {
        if (scrollFailCount.current >= 8) return
        scrollFailCount.current += 1
        scrollTo(index)
      }, 100)
    },
    [scrollTo]
  )
  const onJumpTo = useCallback(() => {
    if (!$.postId) return

    const { list, _loaded } = $.comments
    if (_loaded) {
      try {
        let scrollIndex = 0
        list.forEach(
          (
            item: {
              id: any
              sub: {
                id: any
              }[]
            },
            index: number
          ) => {
            if (scrollIndex) return

            if (item.id === $.postId) {
              scrollIndex = index
            } else if (item.sub) {
              item.sub.forEach((i: { id: any }) => {
                if (i.id === $.postId) scrollIndex = index
              })
            }
          }
        )

        if (scrollIndex) {
          scrollTo(scrollIndex)
        }
      } catch (error) {
        console.error('topic/index.js', 'onJumpTo', error)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollTo])
  const onShowFixedTextarea = useCallback(() => fixedTextareaRef.current?.onFocus(), [])
  const renderItem = useCallback(
    ({ item, index }) => {
      // 延迟渲染, 减少二次进入页面瞬间楼层过多导致动画掉帧, 进入页面瞬间最多只渲染2个楼层
      if (!$.postId) {
        if (!rendered) {
          // 渲染指示标记
          if (index === PRE_RENDER_INDEX) return <Loading style={_.mt.md} />
          if (index > PRE_RENDER_INDEX - 1) return null
        }
      }

      const EVENT = {
        id: '帖子.跳转',
        data: {
          topicId: $.topicId
        }
      } as const

      return (
        <ItemPost
          index={index}
          postId={$.postId}
          authorId={$.topic.userId}
          {...item}
          rendered={rendered}
          showFixedTextare={onShowFixedTextarea}
          event={EVENT}
        />
      )
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rendered]
  )

  useRunAfter(async () => {
    androidKeyboardAdjust('setAdjustResize')

    setTimeout(() => {
      if (isFocusedRef.current) setRendered(true)
    }, 400)

    await $.init()

    if ($.postId) onJumpTo()
  })

  useKeyboardAdjustResize()

  useEffect(() => {
    if (!isFocused) uiStore.closePopableSubject()
  }, [isFocused])

  return useObserver(() => {
    return (
      <>
        <Header fixed={fixed} />
        <TapListener>
          <Page>
            <List
              forwardRef={forwardRef}
              renderItem={renderItem}
              onScroll={onScrollFn}
              onScrollToIndexFailed={onScrollToIndexFailed}
            />
            <TouchScroll onPress={onScrollTo} />
            <Bottom fixedTextareaRef={fixedTextareaRef} />
          </Page>
        </TapListener>
        <Heatmaps />
      </>
    )
  })
}

export default ic(Store, Topic)
