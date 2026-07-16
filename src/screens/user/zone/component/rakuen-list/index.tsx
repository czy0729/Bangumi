/*
 * @Author: czy0729
 * @Date: 2020-10-22 17:24:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-14 21:11:10
 */
import React, { useCallback, useMemo } from 'react'
import { Animated } from 'react-native'
import { observer } from 'mobx-react'
import { Component, ListView, Loading, ScrollView, Text } from '@components'
import { _, systemStore, useStore } from '@stores'
import { ANDROID, USE_NATIVE_DRIVER } from '@constants'
import { TAB_PAGE } from '../../ds'
import { handleToQiafan, keyExtractor, renderItem, renderSectionHeader } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function RakuenList({ ListHeaderComponent, onScroll }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const { advance } = systemStore
  const { _loaded, list, pagination } = $.userTopicsFromCDN

  const styles = memoStyles()

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

      $.forwardRef(ref, TAB_PAGE.rakuen)
    },
    [$]
  )

  /** 自定义底部 */
  const ListFooterComponent = useMemo(
    () =>
      !advance && pagination.pageTotal > 1 && list.length > 0 ? (
        <Text style={_.mt.lg} type='sub' size={12} align='center'>
          仅对
          <Text type='sub' size={12} underline onPress={() => handleToQiafan(navigation)}>
            高级用户
          </Text>
          显示所有数据，总共 {pagination.pageTotal} 页
        </Text>
      ) : undefined,
    [advance, list.length, navigation, pagination.pageTotal]
  )

  /** 加载更多 */
  const handleFooterRefresh = useCallback(() => {
    if (advance) $.fetchUserTopicsFromCDN()
  }, [$, advance])

  if (!_loaded) {
    if (ANDROID) return <Loading style={styles.nestScrollLoading} />

    return (
      <Component id='screen-zone-tab-view' data-type='rakuen-list'>
        <ScrollView
          contentContainerStyle={styles.contentContainerStyle}
          animated
          onScroll={handleScrollEvent}
        >
          <Loading style={styles.loading} />
        </ScrollView>
      </Component>
    )
  }

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
        {...(ListFooterComponent
          ? {
              ListFooterComponent
            }
          : {})}
        onScroll={handleScrollEvent}
        onFooterRefresh={advance ? handleFooterRefresh : undefined}
      />
    </Component>
  )
}

export default observer(RakuenList)
