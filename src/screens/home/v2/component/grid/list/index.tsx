/*
 * @Author: czy0729
 * @Date: 2022-11-21 06:55:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-08 00:53:26
 */
import React from 'react'
import { PaginationList2 } from '@_'
import { _, systemStore, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../../types'
import { memoStyles } from '../styles'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT } from './ds'
import { Props } from './types'

function List({ title }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()
    const numColumns = _.isMobileLanscape ? 9 : _.device(4, 5)

    return (
      <PaginationList2
        key={`${_.orientation}${numColumns}`}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.contentContainerStyle}
        data={$.currentCollection(title).list}
        progressViewOffset={20}
        limit={systemStore.setting.homeGridCoverLayout === 'square' ? 20 : 16}
        numColumns={numColumns}
        renderItem={renderItem}
        onHeaderRefresh={$.onHeaderRefresh}
      />
    )
  })
}

export default List
