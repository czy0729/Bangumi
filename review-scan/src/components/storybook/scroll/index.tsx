/*
 * @Author: czy0729
 * @Date: 2023-04-10 18:23:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-03 15:45:09
 */
import React, { useCallback, useRef, useState } from 'react'
import { ScrollView } from 'react-native'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { useMount } from '@utils/hooks'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import { Component } from '../../component'
import { StorybookState } from '../state'
import { COMPONENT } from './ds'
import { Props as StorybookScrollProps } from './types'
import { styles } from './styles'

/** [WEB] 单页面滑动容器 */
export const StorybookScroll = ({
  style,
  contentContainerStyle,
  scrollEnabled,
  inverted,
  onFooterRefresh,
  onScroll,
  children,
  ...other
}: StorybookScrollProps) => {
  r(COMPONENT)

  const ref = useRef(null)
  const [fetching, setFetching] = useState(false)
  const _onScroll = useCallback(
    async e => {
      try {
        StorybookState.scrollTopMap.set(window?.location?.search, e.nativeEvent.contentOffset.y)
        if (typeof onScroll === 'function') {
          onScroll(e)
        }

        // 到底
        if (ref.current.scrollTop + ref.current.clientHeight >= ref.current.scrollHeight - 32) {
          if (typeof onFooterRefresh === 'function') {
            if (fetching) return

            setFetching(true)
            await onFooterRefresh()
            setFetching(false)
          }
        }
      } catch (error) {}
    },
    [fetching, onFooterRefresh, onScroll]
  )

  useMount(() => {
    try {
      if (!StorybookState.navigating) return

      const y = StorybookState.scrollTopMap.get(window?.location?.search)
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
    <Component id='component-storybook-scroll' data-inverted={inverted} style={styles.scroll}>
      <ScrollView
        ref={ref}
        style={stl(styles.scrollView, style)}
        contentContainerStyle={contentContainerStyle}
        scrollEnabled={scrollEnabled}
        {...other}
        {...SCROLL_VIEW_RESET_PROPS}
        scrollEventThrottle={16}
        onScroll={_onScroll}
      >
        {children}
      </ScrollView>
    </Component>
  )
}

export default StorybookScroll
