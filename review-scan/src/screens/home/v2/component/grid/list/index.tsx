/*
 * @Author: czy0729
 * @Date: 2022-11-21 06:55:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-27 05:24:46
 */
import React from 'react'
import { PaginationList2 } from '@_'
import { _, systemStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import { memoStyles } from '../styles'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT } from './ds'

function List({ title }) {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  const { homeGridCoverLayout } = systemStore.setting
  const numColumns = _.isMobileLanscape ? 9 : _.device(4, 5)
  return (
    <PaginationList2
      key={`${_.orientation}${numColumns}`}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.contentContainerStyle}
      data={$.currentCollection(title).list}
      progressViewOffset={20}
      limit={homeGridCoverLayout === 'square' ? 20 : 16}
      numColumns={numColumns}
      renderItem={renderItem}
      onHeaderRefresh={$.onHeaderRefresh}
    />
  )
}

export default ob(List, COMPONENT)
