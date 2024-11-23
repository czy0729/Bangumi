/*
 * @Author: czy0729
 * @Date: 2024-03-10 04:02:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-21 12:33:50
 */
import React, { useCallback } from 'react'
import { SafeAreaView } from 'react-navigation'
import { useObserver } from 'mobx-react'
import { ListView, Loading } from '@components'
import { _, tinygrailStore } from '@stores'
import { keyExtractor } from '@utils/app'
import { refreshControlProps } from '@tinygrail/styles'
import { Fn, Navigation } from '@types'
import Log from '../log'
import { styles } from './styles'

function List({
  navigation,
  onHeaderRefresh,
  onToggle
}: {
  navigation: Navigation
  onHeaderRefresh: Fn
  onToggle: Fn
}) {
  const renderItem = useCallback(
    ({ item, index }) => (
      <Log navigation={navigation} {...item} index={index} onToggle={onToggle} />
    ),
    [navigation, onToggle]
  )

  return useObserver(() => {
    if (!tinygrailStore.starLogs._loaded) return <Loading />

    return (
      <SafeAreaView style={_.container.flex}>
        <ListView
          style={_.container.flex}
          contentContainerStyle={styles.contentContainerStyle}
          keyExtractor={keyExtractor}
          refreshControlProps={refreshControlProps}
          data={tinygrailStore.starLogs}
          showFooter={false}
          renderItem={renderItem}
          onHeaderRefresh={onHeaderRefresh}
        />
      </SafeAreaView>
    )
  })
}

export default List
