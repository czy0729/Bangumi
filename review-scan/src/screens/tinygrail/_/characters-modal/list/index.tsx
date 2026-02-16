/*
 * @Author: czy0729
 * @Date: 2020-07-09 10:24:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-03 18:32:47
 */
import React from 'react'
import { PaginationList2 } from '@_'
import { useObserver } from '@utils/hooks'
import { TINYGRAIL_LIST_PROPS } from '@tinygrail/styles'
import { styles } from './styles'

function List({ data, renderItem }) {
  return useObserver(() => {
    if (!data) return null

    const { list, _loaded } = data
    return (
      <PaginationList2
        {...TINYGRAIL_LIST_PROPS}
        style={styles.list}
        data={list}
        limit={12}
        showMesume={false}
        footerEmptyDataText={!!_loaded && !list.length ? '没有符合的结果' : '加载中'}
        renderItem={renderItem}
      />
    )
  })
}

export default List
