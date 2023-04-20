/*
 * @Author: czy0729
 * @Date: 2023-03-19 16:50:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-19 20:23:15
 */
import React, { useCallback, useRef } from 'react'
import { Animated } from 'react-native'
import { useMount } from '@utils/hooks'
import { memo } from '@utils/decorators'
import Tab from '../tab'
import ParallaxImage from '../parallax-image'
import { DEFAULT_PROPS } from './ds'

const Wrap = memo(
  ({
    fixedHeight,
    page,
    scrollToOffset,
    fetchCollections,
    onChange,
    onScroll,
    onSelectSubjectType
  }) => {
    useMount(() => {
      fetchCollections()
    })

    const scrollY = useRef(new Animated.Value(0))
    const y = useRef(0)
    const fixed = useRef(false)

    const _onScroll = useCallback(
      (e: {
        nativeEvent: {
          contentOffset: {
            y: any
          }
        }
      }) => {
        onScroll(e)

        const { y: evtY } = e.nativeEvent.contentOffset
        y.current = evtY

        if (fixed.current && evtY < fixedHeight - 20) {
          fixed.current = false
          return
        }

        if (!fixed.current && evtY >= fixedHeight - 20) {
          fixed.current = true
        }
      },
      [fixedHeight, onScroll]
    )
    const updatePageOffset = useCallback(
      (offsets: number | number[]) => {
        if (!offsets) return

        try {
          const config = {
            offset: fixed.current ? fixedHeight : y.current,
            animated: false
          }

          // 传入数组, 作为距离计算调用
          if (Array.isArray(offsets)) {
            offsets.forEach(item => {
              if (typeof scrollToOffset[page + item] === 'function') {
                scrollToOffset[page + item](config)
              }
            })
          }

          // 传入单独数字, 作为索引直接调用
          if (typeof offsets === 'number') {
            if (typeof scrollToOffset[offsets] === 'function') {
              scrollToOffset[offsets](config)
            }
          }
        } catch (error) {}
      },
      [fixedHeight, page, scrollToOffset]
    )
    const onSwipeStart = useCallback(() => {
      updatePageOffset([-1, 1])
    }, [updatePageOffset])
    const onIndexChange = useCallback(
      (index: number) => {
        onChange(index)
        setTimeout(() => {
          updatePageOffset([0])
        }, 0)
      },
      [onChange, updatePageOffset]
    )
    const onRefreshOffset = useCallback(
      (offsets: number | number[] = [0]) => {
        setTimeout(() => {
          updatePageOffset(offsets)
        }, 0)
      },
      [updatePageOffset]
    )

    return (
      <>
        <Tab
          page={page}
          scrollY={scrollY.current}
          onScroll={_onScroll}
          onSwipeStart={onSwipeStart}
          onIndexChange={onIndexChange}
          onSelectSubjectType={onSelectSubjectType}
          onRefreshOffset={onRefreshOffset}
        />
        <ParallaxImage scrollY={scrollY.current} fixed={fixed.current} />
      </>
    )
  },
  DEFAULT_PROPS
)

export default Wrap
