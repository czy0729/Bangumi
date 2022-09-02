/*
 * @Author: czy0729
 * @Date: 2022-06-04 23:01:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-02 13:55:38
 */
import React from 'react'
import { Pagination as PaginationComp } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { styles } from './styles'

const HEAT_MAPS = {
  onPrev: '目录.上一页',
  onNext: '目录.下一页',
  search: '目录.页码跳转'
} as const

function Pagination(props, { $ }: Ctx) {
  const { ipt } = $.state
  return (
    <PaginationComp
      style={styles.pagination}
      input={ipt}
      heatmaps={HEAT_MAPS}
      onPrev={$.onPrev}
      onNext={$.onNext}
      onChange={$.onChange}
      onSearch={$.doSearch}
    />
  )
}

export default obc(Pagination)
