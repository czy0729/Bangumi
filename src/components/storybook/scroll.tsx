/*
 * @Author: czy0729
 * @Date: 2023-04-10 18:23:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-13 18:44:19
 */
import React, { useCallback, useRef, useState } from 'react'
import { ScrollView } from 'react-native'
import { _ } from '@stores'
import { stl } from '@utils'
import { useMount } from '@utils/hooks'
import { SCROLL_VIEW_RESET_PROPS, STORYBOOK_HEIGHT } from '@constants'
import { StorybookScrollProps } from './types'

/** 缓存每个页面的滚动高度 */
export const scrollTopMap = new Map<string, number>()

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
      scrollTopMap.set(window.location.search, e.nativeEvent.contentOffset.y)

      if (typeof onScroll === 'function') {
        onScroll(e)
      }

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
    const y = scrollTopMap.get(window.location.search)
    if (y) {
      ref.current.scrollTo({
        x: 0,
        y,
        animated: false
      })
    }
  })

  return (
    <ScrollView
      ref={ref}
      style={stl(styles.scrollView, style)}
      contentContainerStyle={contentContainerStyle}
      {...other}
      {...SCROLL_VIEW_RESET_PROPS}
      scrollEventThrottle={16}
      onScroll={_onScroll}
    >
      {children}
    </ScrollView>
  )
}

const styles = _.create({
  scrollView: {
    height: STORYBOOK_HEIGHT
  }
})
