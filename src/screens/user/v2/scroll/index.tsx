/*
 * @Author: czy0729
 * @Date: 2022-03-16 16:30:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-14 21:43:39
 */
import React, { useCallback, useRef, useState } from 'react'
import { Animated } from 'react-native'
import { observer } from 'mobx-react'
import { Flex } from '@components'
import { _, uiStore, useStore } from '@stores'
import { useInsets } from '@utils/hooks'
import { H_HEADER } from '../ds'
import ParallaxImage from './parallax-image'
import Tab from './tab'
import { COMPONENT, FIXED_OFFSET } from './ds'

import type { ScrollEvent } from '@types'
import type { Ctx } from '../types'
/** iOS 和 WEB 用 */
function Scroll() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { headerHeight } = useInsets()
  const topHeaderHeight = Math.max(H_HEADER, headerHeight)

  const { page } = $.state
  const fixedHeight = _.parallaxImageHeight - topHeaderHeight

  const scrollY = useRef(new Animated.Value(0))
  const y = useRef(0)

  const fixedRef = useRef(false)
  const [fixed, setFixed] = useState(false)

  const handleScrollCallback = useCallback(
    (e: ScrollEvent) => {
      $.onScroll(e)
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
    [fixedHeight, $]
  )

  const handleUpdatePageOffset = useCallback(
    (offsets: number | number[]) => {
      if (!offsets) return

      try {
        const config = {
          offset: fixed ? fixedHeight : Math.min(y.current, fixedHeight),
          animated: false
        } as const

        if (Array.isArray(offsets)) {
          offsets.forEach(item => {
            if (typeof $.scrollToOffset[page + item] === 'function') {
              $.scrollToOffset[page + item](config)
            }
          })
        }

        if (typeof offsets === 'number' && typeof $.scrollToOffset[offsets] === 'function') {
          $.scrollToOffset[offsets](config)
        }
      } catch {}
    },
    [fixed, fixedHeight, $, page]
  )

  const handleSwipeStart = useCallback(() => {
    handleUpdatePageOffset([-1, 1])

    uiStore.closeAll()
  }, [handleUpdatePageOffset])

  const handleIndexChange = useCallback(
    (index: number) => {
      $.onChange(index)

      requestAnimationFrame(() => {
        handleUpdatePageOffset([0])
      })
    },
    [$, handleUpdatePageOffset]
  )

  const handleRefreshOffset = useCallback(
    (offsets: number | number[] = [0]) => {
      requestAnimationFrame(() => {
        handleUpdatePageOffset(offsets)
      })
    },
    [handleUpdatePageOffset]
  )

  return (
    <Flex.Item>
      <Tab
        page={page}
        scrollY={scrollY.current}
        onScroll={handleScrollCallback}
        onSwipeStart={handleSwipeStart}
        onIndexChange={handleIndexChange}
        onRefreshOffset={handleRefreshOffset}
      />
      <ParallaxImage scrollY={scrollY.current} fixed={fixed} />
    </Flex.Item>
  )
}

export default observer(Scroll)
