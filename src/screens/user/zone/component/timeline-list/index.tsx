/*
 * @Author: czy0729
 * @Date: 2019-05-08 17:40:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:20:09
 */
import React, { useCallback } from 'react'
import { Animated } from 'react-native'
import { Component, ListView, Loading } from '@components'
import { ItemTimeline, TapListener } from '@_'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { USE_NATIVE_DRIVER } from '@constants'
import { TABS } from '../../ds'
import { Ctx } from '../../types'
import { renderSectionHeader } from './utils'
import { COMPONENT, EVENT } from './ds'
import { styles } from './styles'

function TimelineList(props) {
  r(COMPONENT)

  const { $, navigation } = useStore<Ctx>()
  const handleRef = useCallback(
    (ref: any) => {
      $.connectRef(
        ref,
        TABS.findIndex(item => item.title === '时间线')
      )
    },
    [$]
  )

  const renderItem = useCallback(
    ({ item, index }) => (
      <ItemTimeline
        navigation={navigation}
        index={index}
        event={EVENT}
        {...item}
        full
        onDelete={$.doDelete}
      />
    ),
    [$.doDelete, navigation]
  )

  const handleFooterRefresh = useCallback(() => $.fetchUsersTimeline(), [$])

  return useObserver(() => {
    if (!$.usersTimeline._loaded) return <Loading style={styles.loading} />

    return (
      <TapListener>
        <Component id='screen-zone-tab-view' data-type='timeline-list'>
          <ListView
            ref={handleRef}
            contentContainerStyle={_.container.bottom}
            keyExtractor={keyExtractor}
            data={$.usersTimeline}
            sectionKey='date'
            stickySectionHeadersEnabled={false}
            renderSectionHeader={renderSectionHeader}
            renderItem={renderItem}
            animated
            onFooterRefresh={handleFooterRefresh}
            {...props}
            onScroll={Animated.event(
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
            )}
          />
        </Component>
      </TapListener>
    )
  })
}

export default TimelineList
