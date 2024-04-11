/*
 * @Author: czy0729
 * @Date: 2024-04-10 14:30:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-12 02:56:51
 */
import React from 'react'
import { PaginationList2 } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function List(props, { $ }: Ctx) {
  const styles = memoStyles()
  const numColumns = _.portrait(5, 8)
  return (
    <PaginationList2
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.contentContainerStyle}
      data={$.list}
      numColumns={numColumns}
      limit={numColumns * 6}
      renderItem={renderItem}
      onHeaderRefresh={$.fetchFriends}
    />
  )
}

export default obc(List, COMPONENT)
