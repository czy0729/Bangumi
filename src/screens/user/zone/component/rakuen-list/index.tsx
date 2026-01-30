/*
 * @Author: czy0729
 * @Date: 2020-10-22 17:24:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:14:55
 */
import React, { useCallback, useMemo } from 'react'
import { Animated } from 'react-native'
import { Component, ListView, Loading, ScrollView, Text } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { ANDROID, USE_NATIVE_DRIVER } from '@constants'
import { TABS } from '../../ds'
import { handleToQiafan, keyExtractor, renderItem, renderSectionHeader } from './utils'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function RakuenList({ ListHeaderComponent, onScroll }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

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
    const { _loaded, _filter = 0 } = $.userTopicsFromCDN

    /** loading 状态 */
    if (!_loaded) {
      if (ANDROID) {
        return (
          <Loading style={styles.nestScrollLoading}>
            {$.state.timeout && <Text style={_.mt.md}>查询超时，TA可能没有发过帖子</Text>}
          </Loading>
        )
      }

      return (
        <Component id='screen-zone-tab-view' data-type='rakuen-list'>
          <ScrollView
            contentContainerStyle={styles.contentContainerStyle}
            animated
            onScroll={handleScrollEvent}
          >
            <Loading style={styles.loading}>
              {$.state.timeout && <Text style={_.mt.md}>查询超时，TA可能没有发过帖子</Text>}
            </Loading>
          </ScrollView>
        </Component>
      )
    }

    /** footer（会员提示） */
    const ListFooterComponent =
      _filter > 0 ? (
        <>
          <Text style={_.mt.md} type='sub' align='center' size={12}>
            还有{_filter}条数据未显示
          </Text>
          <Text style={_.mt.xs} type='sub' align='center' size={12}>
            <Text type='warning' size={12} onPress={() => handleToQiafan(navigation)}>
              高级会员
            </Text>
            显示所有
          </Text>
        </>
      ) : undefined

    return (
      <Component id='screen-zone-tab-view' data-type='rakuen-list'>
        <ListView
          ref={handleRef}
          nestedScrollEnabled={ANDROID}
          keyExtractor={keyExtractor}
          animated={!ANDROID}
          contentContainerStyle={ANDROID ? styles.nestScroll : styles.contentContainerStyle}
          sectionKey='date'
          data={$.userTopicsFromCDN}
          stickySectionHeadersEnabled={false}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderItem}
          ListHeaderComponent={!ANDROID ? ListHeaderComponent : undefined}
          ListFooterComponent={ListFooterComponent}
          onScroll={handleScrollEvent}
        />
      </Component>
    )
  })
}

export default RakuenList
