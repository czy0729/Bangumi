/*
 * @Author: czy0729
 * @Date: 2019-05-06 00:28:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-14 03:49:50
 */
import React, { useCallback, useMemo } from 'react'
import { Animated, View } from 'react-native'
import { Component, ListView, Loading } from '@components'
import { useStore } from '@stores'
import { keyExtractor } from '@utils'
import { useObserver } from '@utils/hooks'
import { ANDROID, USE_NATIVE_DRIVER } from '@constants'
import { TABS } from '../../ds'
import Footer from './footer'
import { renderItem, renderSectionHeader } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function BangumiList({ ListHeaderComponent, onScroll }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const elFooter = useMemo(() => <Footer />, [])

  /** iOS 才需要 scroll 同步 */
  const handleScrollEvent = useMemo(() => {
    if (ANDROID) return undefined

    return Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              y: $.scrollY
            }
          }
        }
      ],
      {
        useNativeDriver: USE_NATIVE_DRIVER,
        listener: onScroll
      }
    )
  }, [$, onScroll])

  /** iOS 才需要 ref 转发 */
  const handleRef = useCallback(
    (ref: any) => {
      if (ANDROID) return

      $.forwardRef(
        ref,
        TABS.findIndex(item => item.title === '番剧')
      )
    },
    [$]
  )

  return useObserver(() => {
    const styles = memoStyles()

    if (!$.userCollections._loaded) {
      if (ANDROID) {
        return (
          <View style={styles.nestScrollLoading}>
            <Loading.Raw />
          </View>
        )
      }

      return <Loading style={styles.loading} />
    }

    return (
      <Component id='screen-zone-tab-view' data-type='bangumi-list'>
        <ListView
          ref={handleRef}
          nestedScrollEnabled={ANDROID}
          keyExtractor={keyExtractor}
          contentContainerStyle={ANDROID ? styles.nestScroll : styles.contentContainerStyle}
          animated={!ANDROID}
          sections={$.sections}
          showFooter={false}
          renderSectionHeader={renderSectionHeader}
          // @ts-ignore
          renderItem={renderItem}
          ListHeaderComponent={!ANDROID ? ListHeaderComponent : undefined}
          ListFooterComponent={elFooter}
          onScroll={handleScrollEvent}
        />
      </Component>
    )
  })
}

export default BangumiList
