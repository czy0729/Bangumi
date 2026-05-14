/*
 * @Author: czy0729
 * @Date: 2023-03-19 16:50:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-14 08:40:19
 */
import React, { useCallback, useRef } from 'react'
import { Animated } from 'react-native'
import { observer } from 'mobx-react'
import { _, useStore } from '@stores'
import { H_HEADER } from '../ds'
import ParallaxImage from './parallax-image'
import Tab from './tab'
import { COMPONENT, FIXED_OFFSET } from './ds'

import type { ScrollEvent } from '@types'
import type { Ctx } from '../types'

/** WEB 用 */
function Scroll() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const fixedHeight = $.fixedHeight ?? _.parallaxImageHeight - H_HEADER

  const scrollY = useRef(new Animated.Value(0))
  const y = useRef(0)
  const fixed = useRef(false)

  const handleScrollCallback = useCallback(
    (e: ScrollEvent) => {
      $.onScroll(e)

      const { y: evtY } = e.nativeEvent.contentOffset
      y.current = evtY

      if (fixed.current && evtY < fixedHeight - FIXED_OFFSET) {
        fixed.current = false
        return
      }

      if (!fixed.current && evtY >= fixedHeight - FIXED_OFFSET) {
        fixed.current = true
      }
    },
    [fixedHeight, $]
  )

  const handleUpdatePageOffset = useCallback(
    (offsets: number | number[]) => {
      if (!offsets) return

      try {
        const config = {
          offset: fixed.current ? fixedHeight : y.current,
          animated: false
        }

        if (Array.isArray(offsets)) {
          offsets.forEach(item => {
            if (typeof $.scrollToOffset[$.state.page + item] === 'function') {
              $.scrollToOffset[$.state.page + item](config)
            }
          })
        }

        if (typeof offsets === 'number') {
          if (typeof $.scrollToOffset[offsets] === 'function') {
            $.scrollToOffset[offsets](config)
          }
        }
      } catch {}
    },
    [fixedHeight, $]
  )

  const handleSwipeStart = useCallback(() => {
    handleUpdatePageOffset([-1, 1])
  }, [handleUpdatePageOffset])

  const handleIndexChange = useCallback(
    (index: number) => {
      $.onChange(index)
      setTimeout(() => {
        handleUpdatePageOffset([0])
      }, 0)
    },
    [$, handleUpdatePageOffset]
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
        page={$.state.page}
        scrollY={scrollY.current}
        onScroll={handleScrollCallback}
        onSwipeStart={handleSwipeStart}
        onIndexChange={handleIndexChange}
        onRefreshOffset={handleRefreshOffset}
      />
      <ParallaxImage scrollY={scrollY.current} fixed={fixed.current} />
    </>
  )
}

export default observer(Scroll)
