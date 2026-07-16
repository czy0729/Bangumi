/*
 * @Author: czy0729
 * @Date: 2019-05-08 17:40:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-14 21:02:18
 */
import React, { useCallback, useMemo } from 'react'
import { Animated, View } from 'react-native'
import { observer } from 'mobx-react'
import { Component, ListView, Loading } from '@components'
import { TapListener } from '@_'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { ANDROID, USE_NATIVE_DRIVER } from '@constants'
import { TAB_PAGE } from '../../ds'
import { renderItem, renderSectionHeader } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function TimelineList(props: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

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
        listener: props.onScroll
      }
    )
  }, [$, props.onScroll])

  /** iOS 才需要 ref 转发 */
  const handleRef = useCallback(
    (ref: any) => {
      if (ANDROID) return

      $.forwardRef(ref, TAB_PAGE.timeline)
    },
    [$]
  )

  const handleHeaderRefresh = useCallback(() => $.fetchUsersTimeline(true, true), [$])
  const handleFooterRefresh = useCallback(() => $.fetchUsersTimeline(), [$])

  const styles = memoStyles()
  if (!$.usersTimeline._loaded) {
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
    <Component id='screen-zone-tab-view' data-type='timeline-list'>
      <TapListener>
        <ListView
          ref={handleRef}
          nestedScrollEnabled={ANDROID}
          keyExtractor={keyExtractor}
          contentContainerStyle={ANDROID ? styles.nestScroll : _.container.bottom}
          data={$.usersTimeline}
          sectionKey='date'
          stickySectionHeadersEnabled={false}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderItem}
          animated={!ANDROID}
          onHeaderRefresh={handleHeaderRefresh}
          onFooterRefresh={handleFooterRefresh}
          {...props}
          onScroll={handleScrollEvent}
        />
      </TapListener>
    </Component>
  )
}

export default observer(TimelineList)
