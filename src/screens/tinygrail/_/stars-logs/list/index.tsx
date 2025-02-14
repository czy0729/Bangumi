/*
 * @Author: czy0729
 * @Date: 2024-03-10 04:02:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-12 05:57:10
 */
import React, { useCallback } from 'react'
import { SafeAreaView } from 'react-navigation'
import { useObserver } from 'mobx-react'
import { ListView, Loading } from '@components'
import { _, tinygrailStore } from '@stores'
import { keyExtractor } from '@utils/app'
import { refreshControlProps } from '@tinygrail/styles'
import Log from '../log'
import { styles } from './styles'
import { Props } from './types'

function List({ navigation, onHeaderRefresh, onToggle }: Props) {
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
