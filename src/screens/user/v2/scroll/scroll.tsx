/*
 * @Author: czy0729
 * @Date: 2023-03-19 16:50:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-10 22:37:43
 */
import React, { useCallback, useRef, useState } from 'react'
import { Animated } from 'react-native'
import { _ } from '@stores'
import { memo } from '@utils/decorators'
import { FROZEN_FN, FROZEN_OBJECT } from '@constants'
import { H_HEADER } from '../ds'
import ParallaxImage from './parallax-image'
import Tab from './tab'
import { COMPONENT_MAIN, DEFAULT_PROPS, FIXED_OFFSET } from './ds'

import type { ScrollEvent } from '@types'

const Scroll = memo(
  ({
    fixedHeight = _.parallaxImageHeight - H_HEADER,
    page = 0,
    scrollToOffset = FROZEN_OBJECT,
    onChange = FROZEN_FN,
    onScroll = FROZEN_FN
  }) => {
    const scrollY = useRef(new Animated.Value(0))
    const y = useRef(0)

    const fixedRef = useRef(false)
    const [fixed, setFixed] = useState(false)

    const handleScrollCallback = useCallback(
      (e: ScrollEvent) => {
        onScroll(e)
        y.current = e.nativeEvent.contentOffset.y

        if (fixedRef.current && y.current < fixedHeight - FIXED_OFFSET) {
          fixedRef.current = false
          setFixed(false)
          return
        }

        if (!fixedRef.current && y.current >= fixedHeight - FIXED_OFFSET) {
          fixedRef.current = true
          setFixed(true)
        }
      },
      [fixedHeight, onScroll]
    )

    const handleUpdatePageOffset = useCallback(
      (offsets: number | number[]) => {
        if (!offsets) return

        try {
          const config = {
            offset: fixed ? fixedHeight : y.current,
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
        } catch {}
      },
      [fixed, fixedHeight, page, scrollToOffset]
    )

    const handleSwipeStart = useCallback(() => {
      handleUpdatePageOffset([-1, 1])
    }, [handleUpdatePageOffset])

    const handleIndexChange = useCallback(
      (index: number) => {
        onChange(index)
        setTimeout(() => {
          handleUpdatePageOffset([0])
        }, 0)
      },
      [onChange, handleUpdatePageOffset]
    )

    const handleRefreshOffset = useCallback(
      (offsets: number | number[] = [0]) => {
        setTimeout(() => {
          handleUpdatePageOffset(offsets)
        }, 0)
      },
      [handleUpdatePageOffset]
    )

    return (
      <>
        <Tab
          page={page}
          scrollY={scrollY.current}
          onScroll={handleScrollCallback}
          onSwipeStart={handleSwipeStart}
          onIndexChange={handleIndexChange}
          onRefreshOffset={handleRefreshOffset}
        />
        <ParallaxImage scrollY={scrollY.current} fixed={fixed} />
      </>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Scroll
