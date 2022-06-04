/*
 * @Author: czy0729
 * @Date: 2022-06-04 23:01:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-04 23:25:21
 */
import React from 'react'
import { Pagination as PaginationComp } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

const heatmaps = {
  onPrev: '目录.上一页',
  onNext: '目录.下一页',
  search: '目录.页码跳转'
} as const

function Pagination(props, { $ }) {
  const { ipt } = $.state
  return (
    <PaginationComp
      style={styles.pagination}
      input={ipt}
      heatmaps={heatmaps}
      onPrev={$.onPrev}
      onNext={$.onNext}
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
