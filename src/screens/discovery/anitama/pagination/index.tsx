/*
 * @Author: czy0729
 * @Date: 2022-06-05 06:03:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 12:20:35
 */
import React from 'react'
import { Pagination as PaginationComp } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { styles } from './styles'

const HEAT_MAPS = {
  prev: 'Anitama.上一页',
  next: 'Anitama.下一页',
  search: 'Anitama.页码跳转'
} as const

function Pagination(props, { $ }: Ctx) {
  const { ipt } = $.state
  return (
    <PaginationComp
      style={styles.pagination}
      input={ipt}
      heatmaps={HEAT_MAPS}
      onPrev={$.prev}
      onNext={$.next}
      onChange={$.onChange}
      onSearch={$.doSearch}
    />
  )
}

export default obc(Pagination)
