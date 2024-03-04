/*
 * @Author: czy0729
 * @Date: 2024-03-01 23:27:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-04 19:15:07
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
  const onRefreshCallback = useCallback(() => {
    setRefreshing(true)
    setTimeout(async () => {
      await onRefresh()
      setTimeout(() => {
        setRefreshing(false)
      }, 1200)
    }, 0)
  }, [])

  return useObserver(() => (
    <ScrollViewComp
      style={style}
      contentContainerStyle={contentContainerStyle}
      refreshControl={
        <RefreshControl
          {...refreshControlProps}
          progressBackgroundColor={_.select(_.colorPlain, _._colorDarkModeLevel2)}
          colors={[_.colorMain]}
          refreshing={refreshing}
          onRefresh={onRefreshCallback}
        />
      }
      scrollToTop
    >
      {children}
    </ScrollViewComp>
  ))
}

export default ScrollView
