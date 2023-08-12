/*
 * @Author: czy0729
 * @Date: 2023-04-10 18:23:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-26 17:21:41
 */
import React, { useCallback, useRef, useState } from 'react'
import { ScrollView } from 'react-native'
import { _ } from '@stores'
import { stl } from '@utils'
import { useMount } from '@utils/hooks'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import { StorybookState } from './state'
import { StorybookScrollProps } from './types'

export const StorybookScroll = ({
  style,
  contentContainerStyle,
  onFooterRefresh,
  onScroll,
  children,
  ...other
}: StorybookScrollProps) => {
  const ref = useRef(null)
  const [fetching, setFetching] = useState(false)
  const _onScroll = useCallback(
    async e => {
      StorybookState.scrollTopMap.set(
        window.location.search,
        e.nativeEvent.contentOffset.y
      )
      if (typeof onScroll === 'function') {
        onScroll(e)
      }

      // 到底
      if (
        ref.current.scrollTop + ref.current.clientHeight >=
        ref.current.scrollHeight - 32
      ) {
        if (typeof onFooterRefresh === 'function') {
          if (fetching) return

          setFetching(true)
          await onFooterRefresh()
          setFetching(false)
        }
      }
    },
    [fetching, onFooterRefresh, onScroll]
  )

  useMount(() => {
    try {
      if (!StorybookState.navigating) return

      const y = StorybookState.scrollTopMap.get(window.location.search)
      if (y) {
        const scrollTo = () => {
          if (
            // 在顶部
            !ref.current.scrollTop ||
            // 或者设置后的位置与之前的相差较大, 通常是因为前面有些内容在页面渲染后产生了变化
            Math.abs(ref.current.scrollTop - y) >= 40
          ) {
            ref.current.scrollTo({
              x: 0,
              y,
              animated: false
            })
            return false
          }
          return true
        }

        // 主动检查几次
        if (!scrollTo()) {
          setTimeout(() => {
            if (!scrollTo()) {
              setTimeout(() => {
                if (!scrollTo()) {
                  setTimeout(() => {
                    scrollTo()
                  }, 80)
                }
              }, 80)
            }
          }, 80)
        }
      }
    } catch (error) {}
  })

  return (
    <ScrollView
      ref={ref}
      style={stl(styles.scrollView, style)}
      contentContainerStyle={contentContainerStyle}
      {...other}
      {...SCROLL_VIEW_RESET_PROPS}
      scrollEventThrottle={4}
      onScroll={_onScroll}
    >
      {children}
    </ScrollView>
  )
}

const styles = _.create({
  scrollView: {
    flexGrow: 1
  }
})
