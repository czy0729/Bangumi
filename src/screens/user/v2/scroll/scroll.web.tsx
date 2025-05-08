/*
 * @Author: czy0729
 * @Date: 2023-03-19 16:50:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-01 11:47:59
 */
import React, { useCallback, useRef } from 'react'
import { Animated } from 'react-native'
import { _ } from '@stores'
import { memo } from '@utils/decorators'
import { useMount } from '@utils/hooks'
import { FROZEN_FN, FROZEN_OBJECT } from '@constants'
import { ScrollEvent } from '@types'
import { H_HEADER } from '../ds'
import ParallaxImage from './parallax-image'
import Tab from './tab'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

const Scroll = memo(
  ({
    fixedHeight = _.parallaxImageHeight - H_HEADER,
    page = 0,
    scrollToOffset = FROZEN_OBJECT,
    fetchCollections = FROZEN_FN,
    onChange = FROZEN_FN,
    onScroll = FROZEN_FN
  }) => {
    useMount(() => {
      fetchCollections()
    })

    const scrollY = useRef(new Animated.Value(0))
    const y = useRef(0)
    const fixed = useRef(false)

    const _onScroll = useCallback(
      (e: ScrollEvent) => {
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
          onRefreshOffset={onRefreshOffset}
        />
        <ParallaxImage scrollY={scrollY.current} fixed={fixed.current} />
      </>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Scroll
