/*
 * @Author: czy0729
 * @Date: 2023-03-19 16:50:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-19 22:10:36
 */
import React, { useCallback, useRef, useState } from 'react'
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
    onSelectSubjectType
  }) => {
    useMount(() => {
      fetchCollections()
    })

    const scrollY = useRef(new Animated.Value(0))
    const y = useRef(0)
    const [fixed, setFixed] = useState(false)

    const onScroll = useCallback(
      (e: {
        nativeEvent: {
          contentOffset: {
            y: any
          }
        }
      }) => {
        const { y: evtY } = e.nativeEvent.contentOffset
        y.current = evtY

        if (fixed && evtY < fixedHeight - 20) {
          setFixed(false)
          return
        }

        if (!fixed && evtY >= fixedHeight - 20) {
          setFixed(true)
        }
      },
      [fixed, fixedHeight]
    )
    const updatePageOffset = useCallback(
      (index: number[] = [-1, 1]) => {
        index.forEach(item => {
          if (typeof scrollToOffset[page + item] === 'function') {
            scrollToOffset[page + item]({
              offset: fixed ? fixedHeight : y.current,
              animated: false
            })
          }
        })
      },
      [fixed, fixedHeight, page, scrollToOffset]
    )

    const onSwipeStart = useCallback(() => {
      updatePageOffset()
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
    const onToggleList = useCallback(() => {
      setTimeout(() => {
        updatePageOffset([0])
      }, 0)
    }, [updatePageOffset])

    return (
      <>
        <Tab
          page={page}
          scrollY={scrollY.current}
          onScroll={onScroll}
          onSwipeStart={onSwipeStart}
          onIndexChange={onIndexChange}
          onSelectSubjectType={onSelectSubjectType}
          onToggleList={onToggleList}
        />
        <ParallaxImage scrollY={scrollY.current} fixed={fixed} />
      </>
    )
  },
  DEFAULT_PROPS
)

export default Wrap
