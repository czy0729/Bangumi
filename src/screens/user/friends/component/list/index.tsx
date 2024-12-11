/*
 * @Author: czy0729
 * @Date: 2024-04-10 14:30:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 06:47:21
 */
import React from 'react'
import { PaginationList2 } from '@_'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function List() {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  return (
    <PaginationList2
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.contentContainerStyle}
      data={$.list}
      numColumns={$.numColumns}
      limit={$.numColumns * 6}
      renderItem={renderItem}
      onHeaderRefresh={$.fetchFriends}
      onScroll={$.onScroll}
    />
  )
}

export default ob(List, COMPONENT)
