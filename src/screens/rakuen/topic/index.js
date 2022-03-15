/*
 * @Author: czy0729
 * @Date: 2019-04-29 19:28:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-15 02:08:47
 */
import React, { useState, useRef, useCallback } from 'react'
import { Page, Loading } from '@components'
import { useOnScroll } from '@components/header/utils'
import { ItemPost } from '@_'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useObserver, useIsFocused, useRunAfter } from '@utils/hooks'
import { t } from '@utils/fetch'
import { info } from '@utils/ui'
import Header from './header'
import List from './list'
import TouchScroll from './touch-scroll'
import Heatmaps from './heatmaps'
import Bottom from './bottom'
import Store from './store'

const preRenderIndex = 8

const Topic = (props, { $ }) => {
  const isFocused = useIsFocused()
  const { y, fixed, onScroll } = useOnScroll()
  const [rendered, setRendered] = useState(false)
  const listViewRef = useRef(null)
  const fixedTextareaRef = useRef(null)
  const scrollFailCount = useRef(0)

  const scrollTo = useCallback((index = 0) => {
    const { list } = $.comments
    info(list[index].floor, 0.8)

    try {
      listViewRef.current?.scrollToIndex({
        animated: false,
        index,
        viewOffset: 0
      })
    } catch (error) {
      warn('topic/index.js', 'scrollTo', error)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const onScrollTo = useCallback((index = 0) => {
    t('帖子.楼层跳转', {
      topicId: $.topicId,
      index
    })

    if (index === -1) {
      info('#1', 0.8)
      listViewRef.current?.scrollToOffset({
        animated: true,
        offset: 0 - _.headerHeight
      })
      return
    }

    const { list } = $.comments
    info(list[index].floor, 0.8)

    try {
      listViewRef.current?.scrollToIndex({
        animated: true,
        index,
        viewOffset: 0 + _.headerHeight
      })
    } catch (error) {
      warn('topic/index.js', 'onScrollTo', error)
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
        list.forEach((item, index) => {
          if (scrollIndex) return

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

        if (scrollIndex) {
          scrollTo(scrollIndex)
        }
      } catch (error) {
        warn('topic/index.js', 'onJumpTo', error)
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
          if (index === preRenderIndex) return <Loading style={_.mt.md} />
          if (index > preRenderIndex - 1) return null
        }
      }

      const event = {
        id: '帖子.跳转',
        data: {
          topicId: $.topicId
        }
      }

      return (
        <ItemPost
          index={index}
          postId={$.postId}
          authorId={$.topic.userId}
          {...item}
          rendered={rendered}
          showFixedTextare={onShowFixedTextarea}
          event={event}
        />
      )
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rendered]
  )

  useRunAfter(async () => {
    setTimeout(() => {
      if (isFocused.current) setRendered(true)
    }, 400)

    await $.init()
    if ($.postId) onJumpTo()
  })

  return useObserver(() => {
    return (
      <>
        <Header y={y} fixed={fixed} />
        <Page>
          <List
            listViewRef={listViewRef}
            renderItem={renderItem}
            onScroll={onScroll}
            onScrollToIndexFailed={onScrollToIndexFailed}
          />
          <TouchScroll onPress={onScrollTo} />
          <Bottom fixedTextareaRef={fixedTextareaRef} />
        </Page>
        <Heatmaps />
      </>
    )
  })
}

export default ic(Store, Topic)
