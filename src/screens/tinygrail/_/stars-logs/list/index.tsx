/*
 * @Author: czy0729
 * @Date: 2024-03-10 04:02:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-10 04:12:36
 */
import React from 'react'
import { SafeAreaView } from 'react-navigation'
import { ListView, Loading } from '@components'
import { _, tinygrailStore } from '@stores'
import { keyExtractor } from '@utils/app'
import { ob } from '@utils/decorators'
import { refreshControlProps } from '@tinygrail/styles'
import { Fn } from '@types'
import { renderItem } from './utils'
import { COMPONENT } from './ds'
import { styles } from './styles'

function List({ onHeaderRefresh }: { onHeaderRefresh: Fn }) {
  if (!tinygrailStore.starLogs._loaded) return <Loading />

  return (
    <SafeAreaView style={_.container.flex}>
      <ListView
        style={_.container.flex}
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={keyExtractor}
        refreshControlProps={refreshControlProps}
        data={tinygrailStore.starLogs}
        windowSize={6}
        initialNumToRender={24}
        maxToRenderPerBatch={24}
        updateCellsBatchingPeriod={24}
        lazy={24}
        showFooter={false}
        renderItem={renderItem}
        onHeaderRefresh={onHeaderRefresh}
      />
    </SafeAreaView>
  )
}

export default ob(List, COMPONENT)
