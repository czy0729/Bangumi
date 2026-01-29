/*
 * @Author: czy0729
 * @Date: 2020-10-22 17:24:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:14:55
 */
import React, { useCallback } from 'react'
import { Animated } from 'react-native'
import { Component, ListView, Loading, ScrollView, Text } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { USE_NATIVE_DRIVER } from '@constants'
import { TABS } from '../../ds'
import { handleToQiafan, keyExtractor, renderItem, renderSectionHeader } from './utils'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function RakuenList({ ListHeaderComponent, onScroll }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const handleRef = useCallback(
    (ref: any) => {
      $.forwardRef(
        ref,
        TABS.findIndex(item => item.title === '番剧')
      )
    },
    [$]
  )

  return useObserver(() => {
    const handleScroll = Animated.event(
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

    if (!$.userTopicsFromCDN._loaded) {
      return (
        <Component id='screen-zone-tab-view' data-type='rakuen-list'>
          <ScrollView
            contentContainerStyle={styles.contentContainerStyle}
            animated
            onScroll={handleScroll}
          >
            <Loading style={styles.loading}>
              {$.state.timeout && <Text style={_.mt.md}>查询超时，TA可能没有发过帖子</Text>}
            </Loading>
          </ScrollView>
        </Component>
      )
    }

    const { _filter = 0 } = $.userTopicsFromCDN
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
          keyExtractor={keyExtractor}
          animated
          contentContainerStyle={styles.contentContainerStyle}
          sectionKey='date'
          data={$.userTopicsFromCDN}
          stickySectionHeadersEnabled={false}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderItem}
          ListHeaderComponent={ListHeaderComponent}
          ListFooterComponent={ListFooterComponent}
          onScroll={handleScroll}
        />
      </Component>
    )
  })
}

export default RakuenList
