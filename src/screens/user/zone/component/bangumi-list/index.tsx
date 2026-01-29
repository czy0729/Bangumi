/*
 * @Author: czy0729
 * @Date: 2019-05-06 00:28:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-14 03:49:50
 */
import React, { useCallback, useMemo } from 'react'
import { Animated } from 'react-native'
import { Component, ListView, Loading } from '@components'
import { useStore } from '@stores'
import { keyExtractor } from '@utils'
import { useObserver } from '@utils/hooks'
import { USE_NATIVE_DRIVER } from '@constants'
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
          // @ts-ignore
          renderItem={renderItem}
          ListHeaderComponent={ListHeaderComponent}
          ListFooterComponent={elFooter}
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
