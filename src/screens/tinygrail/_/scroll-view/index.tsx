/*
 * @Author: czy0729
 * @Date: 2024-03-01 23:27:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-22 04:21:36
 */
import React, { useCallback, useState } from 'react'
import { RefreshControl } from 'react-native'
import { ScrollView as ScrollViewComp } from '@components'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { refreshControlProps } from '@tinygrail/styles'
import { COMPONENT } from './ds'
import { Props } from './types'

function ScrollView({ style, contentContainerStyle, onRefresh, children }: Props) {
  r(COMPONENT)

  const [refreshing, setRefreshing] = useState(false)
  const handleRefreshCallback = useCallback(() => {
    if (!onRefresh) return

    setRefreshing(true)
    setTimeout(async () => {
      await onRefresh()

      setTimeout(() => {
        setRefreshing(false)
      }, 1200)
    }, 0)
  }, [onRefresh])

  return useObserver(() => (
    <ScrollViewComp
      style={style}
      contentContainerStyle={contentContainerStyle}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            {...refreshControlProps}
            progressBackgroundColor={_.select(_.colorPlain, _._colorDarkModeLevel2)}
            colors={[_.colorMain]}
            refreshing={refreshing}
            onRefresh={handleRefreshCallback}
          />
        ) : undefined
      }
      keyboardDismissMode='on-drag'
      scrollToTop
    >
      {children}
    </ScrollViewComp>
  ))
}

export default ScrollView
