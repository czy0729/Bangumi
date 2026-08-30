/*
 * @Author: czy0729
 * @Date: 2020-07-09 10:24:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 23:18:08
 */
import React from 'react'
import { observer } from 'mobx-react'
import { PaginationList } from '@_'
import { TINYGRAIL_LIST_PROPS } from '@tinygrail/styles'
import { styles } from './styles'

import type { Props } from './types'

function List({ data, renderItem }: Props) {
  if (!data) return null

  const { list, _loaded } = data

  return (
    <PaginationList
      {...TINYGRAIL_LIST_PROPS}
      style={styles.list}
      data={list}
      limit={12}
      showMesume={false}
      footerEmptyDataText={!!_loaded && !list.length ? '没有符合的结果' : '加载中'}
      renderItem={renderItem}
    />
  )
}

export default observer(List)
