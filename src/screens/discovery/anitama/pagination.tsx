/*
 * @Author: czy0729
 * @Date: 2022-06-05 06:03:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-05 06:06:36
 */
import React from 'react'
import { Pagination as PaginationComp } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

const heatmaps = {
  prev: 'Anitama.上一页',
  next: 'Anitama.下一页',
  search: 'Anitama.页码跳转'
} as const

function Pagination(props, { $ }) {
  const { ipt } = $.state
  return (
    <PaginationComp
      style={styles.pagination}
      input={ipt}
      heatmaps={heatmaps}
      onPrev={$.prev}
      onNext={$.next}
      onChange={$.onChange}
      onSearch={$.doSearch}
    />
  )
}

export default obc(Pagination)

const styles = _.create({
  pagination: {
    marginTop: _.xs,
    marginBottom: _.ios(_.md + _.sm, _.md)
  }
})
