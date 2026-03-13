/*
 * @Author: czy0729
 * @Date: 2024-10-10 12:41:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 06:50:04
 */
import React from 'react'
import { View } from 'react-native'
import { ListView } from '@components'
import { useStore } from '@stores'
import { keyExtractor } from '@utils'
import { ob } from '@utils/decorators'
import { Fn } from '@types'
import { Ctx } from '../../types'
import ListHeader from '../list-header'
import { renderItem } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function List() {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  const { limit } = $.state
  let handleFooterRefresh: Fn
  if (!limit || $.data.list.length < limit) {
    handleFooterRefresh = () => $.fetchUserCollections(false)
  }

  return (
    <ListView
      key={$.key}
      keyExtractor={keyExtractor}
      style={styles.list}
      contentContainerStyle={styles.container}
      data={$.data}
      numColumns={Number($.state.numColumns)}
      renderItem={renderItem}
      ListHeaderComponent={<ListHeader />}
      footerEmptyDataComponent={<View />}
      footerNoMoreDataComponent={<View />}
      onHeaderRefresh={() => $.fetchUserCollections(true)}
      onFooterRefresh={handleFooterRefresh}
    />
  )
}

export default ob(List, COMPONENT)
