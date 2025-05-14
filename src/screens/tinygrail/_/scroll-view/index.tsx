/*
 * @Author: czy0729
 * @Date: 2024-03-01 23:27:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-13 16:46:53
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

function ScrollView({ forwardRef, style, contentContainerStyle, onRefresh, children }: Props) {
  r(COMPONENT)

  const [refreshing, setRefreshing] = useState(false)
  const handleRefreshCallback = useCallback(async () => {
    if (!onRefresh) return

    setRefreshing(true)
    try {
      await onRefresh()
    } finally {
      setTimeout(() => setRefreshing(false), 2800)
    }
  }, [onRefresh])

  return useObserver(() => (
    <ScrollViewComp
      forwardRef={forwardRef}
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
    >
      {children}
    </ScrollViewComp>
  ))
}

export default ScrollView
