/*
 * @Author: czy0729
 * @Date: 2023-12-21 15:06:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-07 16:23:27
 */
import { useCallback, useEffect, useRef } from 'react'
import { layoutHeightMap } from '@_/item/post/utils'
import { _, rakuenStore, uiStore } from '@stores'
import { androidKeyboardAdjust, feedback, info } from '@utils'
import { scrollToTop } from '@utils/dom'
import { t } from '@utils/fetch'
import {
  useIsFocused,
  useIsFocusedRef,
  useKeyboardAdjustResize,
  useMount,
  useRunAfter
} from '@utils/hooks'
import { STORYBOOK } from '@constants'
import { Id } from '@types'
import { PRE_OFFSET } from './ds'
import { Ctx } from './types'

export function useTopicPage({ $ }: Ctx) {
  const isFocused = useIsFocused()
  const isFocusedRef = useIsFocusedRef()
  const forwardRef = useRef(null)
  const fixedTextareaRef = useRef(null)
  const scrollFailCount = useRef(0)

  /** 滚动到指定楼层 */
  const scrollTo = useCallback(
    (index = 0) => {
      try {
        const { list } = $.comments
        const item = list[index]
        info(item?.floor, 0.8)

        if (STORYBOOK) {
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

        forwardRef.current?.scrollToIndex({
          animated: false,
          index,
          viewOffset: 0
        })
      } catch (error) {
        console.error('topic/index.js', 'scrollTo', error)
      }
    },
    [$.comments]
  )

  /** 滚动到指定楼层 (重复尝试) */
  const onScrollTo = useCallback(
    (index = 0, animated = true, offset = 0) => {
      try {
        t('帖子.楼层跳转', {
          topicId: $.topicId,
          index
        })

        const { sliderAnimated } = rakuenStore.setting
        if (index === -1) {
          if (animated) info('#1', 0.8)

          if (STORYBOOK) {
            scrollToTop()
          } else {
            forwardRef.current?.scrollToOffset({
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

        if (STORYBOOK) {
          const offsetTop = document.querySelector(
            `item-post[data-key="${item.id}"]`
            // @ts-expect-error
          )?.offsetTop
          if (offsetTop) scrollToTop(offsetTop - _.headerHeight)
        } else {
          forwardRef.current?.scrollToIndex({
            animated: sliderAnimated ? true : animated,
            index,
            viewOffset: 0 + _.headerHeight + offset
          })
        }

        feedback(true)
      } catch (error) {
        console.error('topic/index.js', 'onScrollTo', error)

        // 使用了分页 PaginationList 的情况下, 只能先去到最底层
        try {
          const str = String(error)
          const maximum = str.match(/but maximum is (\d+)/)?.[1]
          if (maximum) {
            if (animated) info(`#${maximum}`, 0.5)
            forwardRef.current?.scrollToIndex({
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
  const onScrollToIndexFailed = useCallback(
    ({ highestMeasuredFrameIndex, index }) => {
      try {
        scrollTo(highestMeasuredFrameIndex)

        setTimeout(() => {
          if (scrollFailCount.current >= 8) return
          scrollFailCount.current += 1
          scrollTo(index)
        }, 100)
      } catch (error) {
        console.error('topic/index.js', 'onScrollToIndexFailed', error)
      }
    },
    [scrollTo]
  )

  /** 提醒页面进入跳转到指定提醒楼层 */
  const onJumpTo = useCallback(
    (postId?: Id) => {
      console.info('onJumpTo', postId)
      const value = postId || $.postId
      if (!value) return

      const { list, _loaded } = $.comments
      if (_loaded) {
        try {
          let scrollIndex: number
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

              if (item.id === value) {
                scrollIndex = index
                console.info('scrollIndex', scrollIndex)
              } else if (item.sub) {
                item.sub.forEach((i: { id: any }) => {
                  if (i.id === value) {
                    scrollIndex = index
                    console.info('scrollIndex sub', scrollIndex)
                  }
                })
              }
            }
          )

          if (scrollIndex !== undefined) scrollTo(scrollIndex)
        } catch (error) {
          console.error('topic/index.js', 'onJumpTo', error)
        }
      }
    },
    [$.comments, $.postId, scrollTo]
  )

  /** 楼层进度条点击 */
  const onFloorPress = useCallback(
    (index = 0) => {
      try {
        onScrollTo(index)

        const directIndex = $.directItems.findIndex(item => item.floor === `#${index + 1}`)
        if (directIndex && directIndex !== -1) {
          $.updateDirection(directIndex)
        }
      } catch (error) {
        console.error('topic/index.js', 'onFloorPress', error)
      }
    },
    [$, onScrollTo]
  )

  /** 导演模式, 按楼层回复顺序前进或者退后 */
  const onDirect = useCallback(
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
          onScrollTo(-1, false)
          return
        }

        const item = $.directItems[nextDirectIndex]
        if (!item) return

        const { index, floor } = item
        let offset = PRE_OFFSET
        if (index.length === 1) {
          onScrollTo(index[0], false, offset)
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

            onScrollTo(index[0], false, offset)
            if (step > 1) info(floor, 0.8)
          }, 40)
        }
        $.updateDirection(nextDirectIndex, floor)
      } catch (error) {
        console.error('topic/index.js', 'onDirect', error)
      }
    },
    [$, onScrollTo]
  )

  /** 显示底部输入框 */
  const onShowFixedTextarea = useCallback(() => {
    try {
      fixedTextareaRef.current?.onFocus()
    } catch (error) {
      console.error('topic/index.js', 'onShowFixedTextarea', error)
    }
  }, [])

  useRunAfter(async () => {
    androidKeyboardAdjust('setAdjustResize')

    setTimeout(() => {
      if (isFocusedRef.current) $.setRendered(true)
    }, 400)

    await $.init()

    if ($.postId) onJumpTo()
  })

  useKeyboardAdjustResize()

  useEffect(() => {
    if (!isFocused) {
      uiStore.closePopableSubject()
      uiStore.closeLikesGrid()
    }
  }, [isFocused])

  /** 页面销毁 */
  useMount(() => {
    return () => {
      setTimeout(() => {
        $.setState({
          fixed: false
        })
      }, 480)
    }
  })

  return {
    /** 底部回复框引用 */
    fixedTextareaRef,

    /** 长列表引用 */
    forwardRef,

    /** 导演模式, 按楼层回复顺序前进或者退后 */
    onDirect,

    /** 楼层进度条点击 */
    onFloorPress,

    /** 跳转到指定提醒楼层 */
    onJumpTo,

    /** 滚动失败后尝试使用保守的方法再次滚动 */
    onScrollToIndexFailed,

    /** 显示底部输入框 */
    onShowFixedTextarea
  }
}
