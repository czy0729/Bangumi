/*
 * @Author: czy0729
 * @Date: 2019-05-06 00:28:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-14 03:49:50
 */
import React, { useCallback } from 'react'
import { Animated } from 'react-native'
import { Component, ListView, Loading } from '@components'
import { useStore } from '@stores'
import { keyExtractor } from '@utils'
import { useObserver } from '@utils/hooks'
import { USE_NATIVE_DRIVER } from '@constants'
import { TABS } from '../../ds'
import { Ctx } from '../../types'
import Footer from './footer'
import { renderItem, renderSectionHeader } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props } from './types'

function BangumiList({ ListHeaderComponent, onScroll }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

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
    const styles = memoStyles()
    if (!$.userCollections._loaded) return <Loading style={styles.loading} />

    return (
      <Component id='screen-zone-tab-view' data-type='bangumi-list'>
        <ListView
          ref={handleRef}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.contentContainerStyle}
          animated
          sections={$.sections}
          showFooter={false}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderItem}
          ListHeaderComponent={ListHeaderComponent}
          ListFooterComponent={<Footer />}
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
              listener: onScroll
            }
          )}
        />
      </Component>
    )
  })
}

export default BangumiList
