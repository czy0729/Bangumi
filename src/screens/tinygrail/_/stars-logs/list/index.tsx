/*
 * @Author: czy0729
 * @Date: 2024-03-10 04:02:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-05 03:46:21
 */
import React, { useCallback, useRef } from 'react'
import { SafeAreaView } from 'react-navigation'
import { observer } from 'mobx-react'
import { ListView, Loading } from '@components'
import { _, tinygrailStore } from '@stores'
import { TINYGRAIL_LIST_PROPS } from '@tinygrail/styles'
import Chart from '../chart'
import Log from '../log'
import { styles } from './styles'

import type { ScrollToIndex } from '@components'
import type { Props } from './types'

function List({ navigation, onToggle, onHeaderRefresh, onFooterRefresh }: Props) {
  const scrollToIndexRef = useRef<ScrollToIndex>(null)

  const handleRef = useCallback((ref: { scrollToIndex: ScrollToIndex }) => {
    if (ref?.scrollToIndex) scrollToIndexRef.current = ref.scrollToIndex
  }, [])
  const handleRenderItem = useCallback(
    ({ item }) => <Log navigation={navigation} {...item} onToggle={onToggle} />,
    [navigation, onToggle]
  )
  const handleChartPress = useCallback((index: number) => {
    scrollToIndexRef.current?.({
      animated: true,
      index
    })
  }, [])

  if (!tinygrailStore.starLogs._loaded) return <Loading />

  return (
    <SafeAreaView style={_.container.flex}>
      <ListView
        {...TINYGRAIL_LIST_PROPS}
        ref={handleRef}
        contentContainerStyle={styles.contentContainerStyle}
        data={tinygrailStore.starLogs}
        initialNumToRender={16}
        renderItem={handleRenderItem}
        onHeaderRefresh={onHeaderRefresh}
        onFooterRefresh={onFooterRefresh}
      />
      <Chart onPress={handleChartPress} />
    </SafeAreaView>
  )
}

export default observer(List)
