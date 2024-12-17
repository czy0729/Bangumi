/*
 * @Author: czy0729
 * @Date: 2024-03-01 23:27:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 05:47:31
 */
import React, { useCallback, useState } from 'react'
import { RefreshControl } from 'react-native'
import { ScrollView } from '@components'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { refreshControlProps } from '@tinygrail/styles'
import Info from '../info'
import Initial from '../initial'
import Slider from '../slider'
import { COMPONENT } from './ds'

function Scroll({ onRefresh }) {
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
  }, [onRefresh])

  return useObserver(() => (
    <ScrollView
      contentContainerStyle={_.container.page}
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
      <Info />
      <Slider />
      <Initial />
    </ScrollView>
  ))
}

export default Scroll
