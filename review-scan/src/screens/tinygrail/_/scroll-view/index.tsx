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
import { feedback } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'
import { Props } from './types'

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}

function ScrollView({ forwardRef, style, contentContainerStyle, onRefresh, children }: Props) {
  r(COMPONENT)

  const [refreshing, setRefreshing] = useState(false)
  const handleRefreshCallback = useCallback(async () => {
    if (!onRefresh) return

    setRefreshing(true)
    try {
      await onRefresh()
    } finally {
      wait(2000).then(() => {
        setRefreshing(false)
        feedback(true)
      })
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
            colors={[_.colorMain]}
            progressBackgroundColor={_.select(_.colorPlain, _._colorDarkModeLevel2)}
            titleColor={_.colorTinygrailText}
            tintColor={_.colorTinygrailText}
            refreshing={refreshing}
            onRefresh={handleRefreshCallback}
          />
        ) : null
      }
      keyboardDismissMode='on-drag'
    >
      {children}
    </ScrollViewComp>
  ))
}

export default ScrollView
