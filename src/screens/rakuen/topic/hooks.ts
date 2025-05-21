/*
 * @Author: czy0729
 * @Date: 2023-12-21 15:06:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-20 07:36:30
 */
import { useCallback, useRef } from 'react'
import { FlatList } from 'react-native'
import { layoutHeightMap } from '@_/item/post/utils'
import { _, rakuenStore, uiStore, useInitStore } from '@stores'
import { feedback, info } from '@utils'
import { scrollToTop } from '@utils/dom'
import { t } from '@utils/fetch'
import { useKeyboardAdjustResize, usePageLifecycle } from '@utils/hooks'
import { WEB } from '@constants'
import { Id, NavigationProps } from '@types'
import store from './store'
import { PRE_OFFSET } from './ds'
import { Ctx } from './types'

export function useTopicPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { id, $ } = context

  /** 长列表引用 */
  const scrollViewRef = useRef<FlatList>(null)

  /** 底部回复框引用 */
  const fixedTextareaRef = useRef(null)

  /** 尝试滚动失败次数 */
  const scrollFailCount = useRef(0)

  /** 滚动到指定楼层 */
  const handleScrollTo = useCallback(
    (index = 0) => {
      try {
        const { list } = $.comments
        const item = list[index]
        info(item?.floor, 0.8)

        if (WEB) {
          if (index === -1) {
            scrollToTop()
            return
          }

          const offsetTop = document.querySelector(
            `item-post[data-key="${item.id}"]`
            // @ts-expect-error
          )?.offsetTop
          if (offsetTop) scrollToTop(offsetTop - _.headerHeight)
          return
        }

        scrollViewRef.current?.scrollToIndex({
          animated: false,
          index,
          viewOffset: 0
        })
      } catch (error) {
        console.error('topic/index.js', 'handleScrollTo', error)
      }
    },
    [$.comments]
  )

  /** 滚动到指定楼层 (重复尝试) */
  const handleScrollToRetry = useCallback(
    (index = 0, animated = true, offset = 0) => {
      try {
        t('帖子.楼层跳转', {
          topicId: $.topicId,
          index
        })

        const { sliderAnimated } = rakuenStore.setting
        if (index === -1) {
          if (animated) info('#1', 0.8)

          if (WEB) {
            scrollToTop()
          } else {
            scrollViewRef.current?.scrollToOffset({
              animated: sliderAnimated ? true : animated,
              offset: 0 - _.headerHeight
            })
          }

          feedback(true)
          $.updateDirection(-1, '')
          return
        }

        const { list } = $.comments
        const item = list[index]
        if (animated) info(item?.floor, 0.8)

        if (WEB) {
          const offsetTop = document.querySelector(
            `item-post[data-key="${item.id}"]`
            // @ts-expect-error
          )?.offsetTop
          if (offsetTop) scrollToTop(offsetTop - _.headerHeight)
        } else {
          scrollViewRef.current?.scrollToIndex({
            animated: sliderAnimated ? true : animated,
            index,
            viewOffset: 0 + _.headerHeight + offset
          })
        }

        feedback(true)
      } catch (error) {
        console.error('topic/index.js', 'handleScrollToRetry', error)

        // 使用了分页 PaginationList 的情况下, 只能先去到最底层
        try {
          const str = String(error)
          const maximum = str.match(/but maximum is (\d+)/)?.[1]
          if (maximum) {
            if (animated) info(`#${maximum}`, 0.5)
            scrollViewRef.current?.scrollToIndex({
              animated,
              index: Number(maximum),
              viewOffset: 0 + _.headerHeight
            })
          }
          // eslint-disable-next-line no-catch-shadow
        } catch (error) {}
      }
    },
    [$]
  )

  /** 滚动失败后尝试使用保守的方法再次滚动 */
  const handleScrollToIndexFailed = useCallback(
    ({ highestMeasuredFrameIndex, index }) => {
      try {
        handleScrollTo(highestMeasuredFrameIndex)

        setTimeout(() => {
          if (scrollFailCount.current >= 8) return
          scrollFailCount.current += 1
          handleScrollTo(index)
        }, 100)
      } catch (error) {
        console.error('topic/index.js', 'handleScrollToIndexFailed', error)
      }
    },
    [handleScrollTo]
  )

  /** 提醒页面进入跳转到指定提醒楼层 */
  const handleJumpTo = useCallback(
    (postId?: Id) => {
      console.info('handleJumpTo', postId)
      const value = postId || $.postId
      if (!value) return

      const { list, _loaded } = $.comments
      if (_loaded) {
        try {
          let scrollIndex: number
          list.forEach((item, index: number) => {
            if (scrollIndex) return

            if (item.id === value) {
              scrollIndex = index
              console.info('scrollIndex', scrollIndex)
            } else if (item.sub) {
              item.sub.forEach((i: { id: any }) => {
                if (i.id === value) {
                  // 父楼层强制展开
                  $.onExpand(item.id)

                  scrollIndex = index
                  console.info('scrollIndex sub', scrollIndex)
                }
              })
            }
          })

          if (scrollIndex !== undefined) handleScrollTo(scrollIndex)
        } catch (error) {
          console.error('topic/index.js', 'handleJumpTo', error)
        }
      }
    },
    [$, handleScrollTo]
  )

  /** 楼层进度条点击 */
  const handleFloorPress = useCallback(
    (index = 0) => {
      try {
        handleScrollToRetry(index)

        const directIndex = $.directItems.findIndex(item => item.floor === `#${index + 1}`)
        if (directIndex && directIndex !== -1) {
          $.updateDirection(directIndex)
        }
      } catch (error) {
        console.error('topic/index.js', 'handleFloorPress', error)
      }
    },
    [$, handleScrollToRetry]
  )

  /** 导演模式, 按楼层回复顺序前进或者退后 */
  const handleDirect = useCallback(
    (isNext: boolean = true, step: number = 1) => {
      try {
        const { length } = $.directItems
        if (!$.directItems.length) return

        const { directIndex } = $.state
        const nextDirectIndex = Math.min(
          length - 1,
          Math.max(0, directIndex + (isNext ? 1 : -1) * step)
        )
        if (
          (directIndex === 0 && nextDirectIndex === 0) ||
          (directIndex === -1 && nextDirectIndex === 0 && !isNext)
        ) {
          handleScrollToRetry(-1, false)
          return
        }

        const item = $.directItems[nextDirectIndex]
        if (!item) return

        const { index, floor } = item
        let offset = PRE_OFFSET
        if (index.length === 1) {
          handleScrollToRetry(index[0], false, offset)
          if (step > 1) info(floor, 0.8)
        } else {
          // 假如子楼层折叠中, 需要先展开
          const { subExpand } = rakuenStore.setting
          const needExpand = index[1] > Number(subExpand) - 1
          if (needExpand) $.onExpand(item.pid)

          setTimeout(() => {
            // 计算整个子楼层到此处的高度
            const { pid, sibling } = item
            offset += PRE_OFFSET
            offset -= layoutHeightMap.get(pid) || 0
            sibling.forEach(id => {
              offset -= layoutHeightMap.get(id) || 0
            })

            handleScrollToRetry(index[0], false, offset)
            if (step > 1) info(floor, 0.8)
          }, 40)
        }
        $.updateDirection(nextDirectIndex, floor)
      } catch (error) {
        console.error('topic/index.js', 'handleDirect', error)
      }
    },
    [$, handleScrollToRetry]
  )

  /** 滚动到顶 */
  const handleScrollToTop = useCallback(() => {
    feedback()
    scrollViewRef.current?.scrollToOffset({
      animated: true,
      offset: 0 - _.headerHeight
    })
  }, [])

  /** 显示底部输入框 */
  const handleShowFixedTextarea = useCallback(() => {
    try {
      fixedTextareaRef.current?.onFocus()
    } catch (error) {
      console.error('topic/index.js', 'handleShowFixedTextarea', error)
    }
  }, [])

  usePageLifecycle(
    {
      async onEnterComplete() {
        await $.init()

        if ($.postId) handleJumpTo()
      },
      onBlur() {
        uiStore.closePopableSubject()
        uiStore.closeLikesGrid()
      },
      onLeave() {
        uiStore.closePopableSubject()
        uiStore.closeLikesGrid()
      },
      onLeaveComplete() {
        $.unmount()
      }
    },
    id
  )
  useKeyboardAdjustResize()

  return {
    ...context,
    scrollViewRef,
    fixedTextareaRef,
    handleDirect,
    handleFloorPress,
    handleJumpTo,
    handleScrollToIndexFailed,
    handleScrollToTop,
    handleShowFixedTextarea
  }
}
